import fetchClient from "../../../api/fetchClient";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { ButtonPanel, Input, LabelModal } from "../sharing/form";
import { toastSuccess } from "@/utils/toast";

export const UserForm = ({
    currentUser, setCurrentIndex, addToUser, editUser, currentIndex
}) => {
    const isAddMode = currentUser === null;
    const { register, handleSubmit, reset, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data, event) => {
        setLoading(true);
        event.preventDefault();
        if (isAddMode) {
            try {
                const response = await fetchClient.post('/user', data)
                await setTimeout(() => {
                    setLoading(false);
                    toastSuccess("Successfully added user")
                    addToUser({ ...response?.user });
                }, 3000);
            }
            catch (error) {
                setLoading(false);
                toastError(error);
            }
        }
        else {
            try {
                const response = await fetchClient.put(`/user/${currentUser._id}`, {
                    ...data,
                })
                await setTimeout(() => {
                    setLoading(false);
                    toastSuccess("Managed to edit user")
                    editUser(currentUser._id, response.user);
                }, 3000);
            } catch (error) {
                setLoading(false);
                toastError(error);
            }
        }
    }
    const formRef = useRef(null)
    useEffect(() => {
        if (isAddMode) {
            reset({
                address: { first: '', second: '' },
                creditCard: { number: '', CVV: '' },
                email: '',
                name: '',
                role: '',
                token :{ isVerified: false }
            })
            setValue("token.isVerified", false)
        }
        else {
            setValue("token.isVerified", currentUser?.token?.isVerified || false)
            reset({
                address: { first: currentUser?.address?.first, second: currentUser?.address?.second },
                creditCard: { number: currentUser?.creditCard?.number, CVV: currentUser?.creditCard?.CVV },
                email: currentUser?.email,
                name: currentUser?.name,
                role: currentUser?.role,
                token : { isVerified: currentUser?.token?.isVerified }
            })
        }
    }, [currentIndex])
    return (
        <div>
            <h1 className='pb-5 text-xl font-bold'>
                {isAddMode ? <> Add Users... </> : <> Edit Users... </>}
            </h1>

            <form
                formRef={formRef}
                className="font-medium"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mx-auto">
                    {/* User name */}
                    {!isAddMode
                        &&
                        <>
                            <LabelModal text="User id" />
                            <Input
                                type="text"
                                defaultValue={currentUser?._id}
                                disabled
                                placeholder="Enter user name..."

                            />
                        </>
                    }
                    <LabelModal text="User name" />
                    <Input
                        type="text"
                        defaultValue={currentUser?.name}
                        {...register("name")}
                        required
                        placeholder="Enter user name..."

                    />
                    {/* Email */}
                    <LabelModal text="Email" />
                    <Input
                        type="text"
                        defaultValue={currentUser?.email}
                        {...register("email")}
                        required
                        placeholder="Enter email..."

                    />
                    <div className="grid lg:grid-cols-2">
                        {isAddMode &&
                            <>
                                <div>
                                    {/* Password */}
                                    <LabelModal text="Password" />
                                    <Input
                                        type="password"
                                        placeholder="*********"
                                        {...register("password")}
                                    />
                                </div>
                                <div>
                                    {/* Confirm Password */}
                                    <LabelModal text="Confirm Password" />
                                    <Input
                                        type="password"
                                        placeholder="*********"
                                        {...register("confirmPassword")}
                                    />
                                </div>
                            </>
                        }
                        <div>
                            {/* IsVerified */}
                            <LabelModal text="Verified" />
                            <Input
                                type="checkbox"
                                className="toggle toggle-success"
                                {...register("token.isVerified")}
                                {
                                ...(currentUser?.token?.isVerified ? { defaultChecked: true } : {})
                                }
                            />
                        </div>
                        <div>
                            {/* Role */}
                            <LabelModal text="Role" />
                            <Input
                                type="text"
                                defaultValue={currentUser?.role}
                                {...register("role")}
                                required
                                placeholder="Enter user role..."

                            />
                        </div>
                        <div>
                            {/* Address First */}
                            <LabelModal text="Address First Line" />
                            <Input
                                type="text"
                                defaultValue={currentUser?.address?.first}
                                {...register("address.first")}
                                placeholder="Enter address first line..."

                            />
                        </div>
                        <div>
                            {/* Manufacturer */}
                            <LabelModal text="Address Second Line" />
                            <Input
                                type="text"
                                defaultValue={currentUser?.address?.second}
                                {...register("address.second")}
                                placeholder="Enter address second line..."

                            />
                        </div>
                        <div>
                            {/* Credit card number */}
                            <LabelModal text="Credit Card Number" />
                            <Input
                                type="text"
                                defaultValue={currentUser?.creditCard?.number}
                                {...register("creditCard.number")}
                                placeholder="Enter Credit Card Number..."

                            />
                        </div>
                        <div>
                            {/* Credit Card CVV */}
                            <LabelModal text="Credit Card CVV" />
                            <Input
                                type="text"
                                defaultValue={currentUser?.creditCard?.CVV}
                                {...register("creditCard.CVV")}
                                placeholder="Enter Credit Card CVV..."

                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        {
                            isAddMode ?
                                <>
                                    <ButtonPanel classNames={`mt-4 ${loading ? "loading" : ""}`} type="submit" >
                                        Add User
                                    </ButtonPanel>
                                </>
                                :
                                <>
                                    <ButtonPanel classNames={`mt-4 ${loading ? "loading" : ""}`} type="submit">
                                        Edit User
                                    </ButtonPanel>
                                    <ButtonPanel classNames={`mt-4 ml-5}`}
                                        onClick={() => { reset(); setCurrentIndex(-1); }}>
                                        Add mode
                                    </ButtonPanel>
                                </>
                        }
                    </div>

                </div>
            </form>
        </div>
    )
}