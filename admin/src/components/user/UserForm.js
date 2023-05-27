import fetchClient from "../../../api/fetchClient";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Input, LabelModal } from "../sharing/form";

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
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    addToUser({ ...response.data });
                }, 3000);
            }
            catch (error) {
                if (loading) setLoading(false);
                toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
            }
        }
        else {
            try {
                const response = await fetchClient.put(`/user/${currentUser._id}`, {
                    ...data,
                })
                await setTimeout(() => {
                    setLoading(false);
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    editUser({ ...currentUser, ...data });
                }, 3000);
            } catch (error) {
                setLoading(false);
                toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
            }
        }
    }
    const formRef = useRef(null)
    useEffect(() => {
        setValue("token.isVerified", currentUser?.token?.isVerified)
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
                                    <button className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`} type="submit" >
                                        Add User
                                    </button>
                                </>
                                :
                                <>
                                    <button className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`} type="submit">
                                        Edit User
                                    </button>
                                    <button className={`btn btn-primary mt-4 ml-5 ${loading ? "loading" : ""}`}
                                        onClick={() => { reset(); setCurrentIndex(-1); }}>
                                        Add mode
                                    </button>
                                </>
                        }
                    </div>

                </div>
            </form>
        </div>
    )
}