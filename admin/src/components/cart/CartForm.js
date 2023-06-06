import fetchClient from "../../../api/fetchClient";
import { useRef, useState, useEffect, Fragment } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from 'react-toastify';
import { ButtonSignIn, Input, LabelModal, Select } from "../sharing/form";
import { toastError, toastSuccess } from "@/utils/toast";

export const CartForm = ({
    currentCart, setCurrentIndex, addToCart, editCart, currentIndex
}) => {
    const isAddMode = currentCart === null;
    const { control, register, handleSubmit, reset, setValue } = useForm();
    const {  } = useFieldArray({
        control,
        name: "description",
    });
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data, event) => {
        setLoading(true);
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
        else {
            try {
                // const response = await fetchClient.put(`/cart/${currentCart._id}`, {
                //     ...data,
                // })
                // await setTimeout(() => {
                //     setLoading(false);
                // toastSuccess(response.message)
                //     editCart({ ...currentCart, ...data });
                // }, 2000);
            } catch (error) {
                setLoading(false);
                toastError(error)
            }
        }
    }
    const formRef = useRef(null)
    useEffect(() => {
        if (document.getElementById('status')!= undefined) document.getElementById('status').value = currentCart?.status;
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
                                        required
                                        id="status"
                                        optionNames={["Active", "Paid", "Delivered"]}
                                        optionValues={["active", "paid", "delivered"]}
                                    />
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
                                    </div>
                                </div>
                            </Fragment>
                        )
                    })}

                    <div className="flex justify-center">
                        {
                            isAddMode ?
                                <>
                                    <ButtonSignIn classNames={`btn btn-primary mt-4 ${loading ? "loading" : ""}`} type="submit" >
                                        Add Cart
                                    </ButtonSignIn>
                                </>
                                :
                                <>
                                    <ButtonSignIn className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`} type="submit">
                                        Edit Cart
                                    </ButtonSignIn>
                                    <ButtonSignIn className={`btn btn-primary mt-4 ml-5`}
                                        onClick={() => { reset(); setCurrentIndex(-1); }}>
                                        Add mode
                                    </ButtonSignIn>
                                </>
                        }
                    </div>

                </div>
            </form>
        </div>
    )
}