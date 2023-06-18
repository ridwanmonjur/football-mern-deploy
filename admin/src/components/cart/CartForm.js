import fetchClient from "../../../api/fetchClient";
import { useRef, useState, useEffect, Fragment } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from 'react-toastify';
import { ButtonPanel, ButtonSignIn, Input, LabelModal, Select } from "../sharing/form";
import { toastError, toastSuccess } from "@/utils/toast";

export const CartForm = ({
    currentCart, setCurrentIndex, addToCart,  currentIndex, editCart
}) => {
    const isAddMode = currentCart === null;
    const { control, register, handleSubmit, reset,  formState: { errors } } = useForm({
        mode: "all"
    });
    const { } = useFieldArray({
        control,
        name: "description",
    });
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data, event) => {
        setLoading(true);
        if (document.getElementById('status') != undefined) 
            data.status = currentCart?.status;
        if (data.status =="no-value" || data.status == null){
            toast.error ("Cart status is a required value.")
            return;
        }
        event.preventDefault();
        if (isAddMode == true) {
            try {
                const response = await fetchClient.post('/cart', data)
                await setTimeout(() => {
                    setLoading(false);
                    toastSuccess(response.message)
                    addToCart({ ...response.data });
                }, 2000);
            }
            catch (error) {
                setLoading(false);
                toastError(error)
            }
        }
    }
    const formRef = useRef(null)
    useEffect(() => {
        if (document.getElementById('status') != undefined) document.getElementById('status').value = currentCart?.status;
        // setValue("status", currentCart?.status)
    }, [currentIndex])
    return (
        <div>
            <h1 className='pb-5 text-xl font-bold'>
                {isAddMode ? <> Add Carts... </> : <> Edit Carts... </>}
            </h1>

            <form
                formRef={formRef}
                className="font-medium"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mx-auto">
                    {
                        isAddMode &&
                        <>
                            <LabelModal text="Cart user id" />
                            <Input
                                type="text"
                                placeholder="Add user id"
                            />
                        </>
                    }
                    {!isAddMode &&
                        (<>
                            {/* Cart id */}
                            <LabelModal text="Cart id" />
                            <Input
                                type="text"
                                defaultValue={currentCart?._id}
                                disabled
                            />
                            {/* Cart id */}
                            <LabelModal text="Cart user id" />
                            <Input
                                type="text"
                                defaultValue={currentCart?.user?._id}
                                disabled
                            />
                            <div className="grid lg:grid-cols-2">
                                <div>
                                    {/* Cart name */}
                                    <LabelModal text="Cart user name" />
                                    <Input
                                        type="text"
                                        defaultValue={currentCart?.user?.name}
                                        disabled
                                    />
                                </div>
                                <div>
                                    {/* Cart name */}
                                    <LabelModal text="Cart user email" />
                                    <Input
                                        type="text"
                                        defaultValue={currentCart?.user?.email}
                                        disabled
                                    />
                                </div>
                                <div>
                                    {/* Cart total */}
                                    <LabelModal text="Total" />
                                    <Input
                                        type="text"
                                        defaultValue={currentCart?.total}
                                        placeholder="Enter cart total..."
                                        disabled
                                    />
                                </div>
                                <div>
                                    {/* Cart status */}
                                    <LabelModal text="Cart status" />
                                    <Select
                                        defaultValue={currentCart?.status}
                                        {...register("status")}
                                        id="status"
                                        optionNames={["Active", "Paid", "Delivered"]}
                                        optionValues={["active", "paid", "delivered"]}
                                    />
                                    {errors.status && <p className="text-warning">{errors.status.message}</p>}
                                </div>
                            </div>
                        </>)
                    }
                    {currentCart?.products[0] != undefined && <div className="my-2">Products</div>}
                    {currentCart?.products.map((field, index) => {
                        return (
                            <Fragment key={field._id}
                            >
                                <div className="my-2">
                                    <span className="badge badge-primary mr-3"> {index + 1} </span>
                                    <span className="mr-3">{field?.name}</span>
                                    <span className="badge badge-success"> {currentCart?.description[index]?.size} </span>
                                </div>

                                <div className="grid lg:grid-cols-2">
                                    <div>
                                        <LabelModal text="Product price" />
                                        <Input
                                            defaultValue={field?.price}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <LabelModal text="Product quantity" />
                                        <Input
                                            defaultValue={currentCart?.description[index]?.quantity}
                                            {...register(`description.${index}.quantity`)}
                                        />
                                        {errors.description 
                                        && errors.description[index] 
                                        && errors.description[index].quantity
                                        && <p className="text-warning">{errors.description[index].quantity.message}</p>}
                                    </div>
                                </div>
                            </Fragment>
                        )
                    })}

                    <div className="flex justify-around mt-6">
                        {
                            isAddMode &&
                                <>
                                    <ButtonPanel classNames={`btn btn-primary mt-4 ${loading ? "loading" : ""}`} type="submit" >
                                        Add Cart
                                    </ButtonPanel>
                                </>
                                
                        }
                    </div>

                </div>
            </form>
        </div>
    )
}