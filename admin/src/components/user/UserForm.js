import fetchClient from "../../../api/fetchClient";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

export const UserForm = ({
    currentUser, setCurrentIndex, addToUser, editUser
}) => {
    const isAddMode = currentUser === null;
    const { register, handleSubmit, reset } = useForm();
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
                    <label className="label">
                        <span className="label-text">User name</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={currentUser?.name}
                        {...register("name")}
                        required
                        placeholder="Enter user name..."
                        className="input input-bordered dark:bg-white inline w-full  mb-2"
                    />
                    {/* Email */}
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={currentUser?.email}
                        {...register("email")}
                        required
                        placeholder="Enter email..."
                        className="input input-bordered dark:bg-white inline w-full  mb-2"
                    />
                    <div className="grid lg:grid-cols-2">
                        <div>
                            {/* IsVerified */}
                            <label className="label">
                                <span className="label-text">Verified</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={currentUser?.token?.isVerified}
                                {...register("token.isVerified")}
                                required
                                placeholder="Enter user is verified..."
                                className="input input-bordered dark:bg-white inline w-full  mb-2"
                            />
                        </div>
                        <div>
                            {/* Role */}
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={currentUser?.role}
                                {...register("role")}
                                required
                                placeholder="Enter user role..."
                                className="input input-bordered dark:bg-white inline w-full  mb-2"
                            />
                        </div>
                        <div>
                            {/* Address First */}
                            <label className="label">
                                <span className="label-text">Address First Line</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={currentUser?.address?.first}
                                {...register("address.first")}
                                required
                                placeholder="Enter address first line..."
                                className="input input-bordered dark:bg-white inline w-full  mb-2"
                            />
                        </div>
                        <div>
                            {/* Manufacturer */}
                            <label className="label">
                                <span className="label-text">Address Second Line</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={currentUser?.address?.second}
                                {...register("address.second")}
                                required
                                placeholder="Enter address second line..."
                                className="input input-bordered dark:bg-white inline w-full  mb-2"
                            />
                        </div>
                        <div>
                            {/* Credit card number */}
                            <label className="label">
                                <span className="label-text">Credit Card Number</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={currentUser?.creditCard?.number}
                                {...register("creditCard.number")}
                                required
                                placeholder="Enter Credit Card Number..."
                                className="input input-bordered dark:bg-white inline w-full  mb-2"
                            />
                        </div>
                        <div>
                            {/* Credit Card CVVcreditCard */}
                            <label className="label">
                                <span className="label-text">Credit Card CVV</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={currentUser?.creditCard?.CVV}
                                {...register("creditCard.CVV")}
                                required
                                placeholder="Enter Credit Card CVV..."
                                className="input input-bordered dark:bg-white inline w-full  mb-2"
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