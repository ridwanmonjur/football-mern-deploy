import fetchClient from "../../../api/fetchClient";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Input, LabelModal, Select } from "../sharing/form";

export const ProductForm = ({
    currentProduct, setCurrentIndex, addToProduct, editProduct, currentIndex
}) => {
    console.log({ currentProduct })
    const isAddMode = currentProduct === null;
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data, event) => {
        setLoading(true);
        event.preventDefault();
        if (isAddMode) {
            try {
                const response = await fetchClient.post('/product', data)
                await setTimeout(() => {
                    setLoading(false);
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    addToProduct({ ...response.data });
                }, 3000);
            }
            catch (error) {
                if (loading) setLoading(false);
                toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
            }
        }
        else {
            try {
                const response = await fetchClient.put(`/product/${currentProduct._id}`, {
                    ...data,
                })
                await setTimeout(() => {
                    setLoading(false);
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    editProduct({ ...currentProduct, ...data });
                }, 3000);
            } catch (error) {
                setLoading(false);
                toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
            }
        }
    }
    const formRef = useRef(null)
    useEffect(() => {
        if (document.getElementById('type')!= undefined) document.getElementById('type').value = currentProduct?.type;
        // setValue("status", currentCart?.status)
    }, [currentIndex])
    return (
        <div>
            <h1 className='pb-5 text-xl font-bold'>
                {isAddMode ? <> Add Products... </> : <> Edit Products... </>}
            </h1>

            <form
                formRef={formRef}
                className="font-medium"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mx-auto">

                    {/* Product name */}
                    {!isAddMode
                        &&
                        <>
                            <LabelModal text="Product id" />
                            <Input
                                type="text"
                                defaultValue={currentProduct?._id}
                                disabled={true}
                            />
                        </>
                    }
                    <LabelModal text="Product name" />
                    <Input
                        type="text"
                        defaultValue={currentProduct?.name}
                        {...register("name")}
                        required
                        placeholder="Enter product name..."
                    />
                    {/* Seller id */}
                    <LabelModal text="Seller id" />
                    <Input
                        type="text"
                        {...register("seller")}
                        required
                        defaultValue={currentProduct?.seller?._id}
                        placeholder="Enter seller id..."
                    />

                    {/* Seller name */}
                    {!isAddMode
                        &&
                        <>
                            <LabelModal text="Seller name" />
                            <Input
                                type="text"
                                defaultValue={currentProduct?.seller?.name}
                                {...register("seller.name")}
                                disabled={true}
                            />
                        </>
                    }
                    <div className="grid lg:grid-cols-2">
                        <div>
                            {/* Type */}
                            {isAddMode
                                &&
                                <>
                                    <LabelModal text="Type" />
                                    <Select
                                        optionNames={["Jerseys", "Accessories", "Boots"]}
                                        optionValues={["jerseys", "accessories", "boots"]}
                                    />
                                </>
                            }
                            {!isAddMode
                                &&
                                <>
                                    <LabelModal text="Type" />
                                    <Select
                                    // daisyui broken so need it
                                        id="type"
                                        defaultValue={currentProduct?.type}
                                        optionNames={["Jerseys", "Accessories", "Boots"]}
                                        optionValues={["jerseys", "accessories", "boots"]}
                                    />
                                </>
                            }
                        </div>
                        <div>
                            {/* Manufacturer */}
                            <LabelModal text="Manufacturer" />
                            <Input
                                type="text"
                                defaultValue={currentProduct?.manufacturer}
                                {...register("manufacturer")}
                                required
                                placeholder="Enter product manufacturer..."

                            />
                        </div>
                        <div>
                            {/* Price */}
                            <LabelModal text="Price (£)" />
                            <Input
                                type="text"
                                defaultValue={currentProduct?.price}
                                {...register("price")}
                                required
                                placeholder="Enter price..."

                            />
                        </div>
                        <div>
                            {/* Manufacturer */}
                            <LabelModal text="Stock" />
                            <Input
                                type="text"
                                defaultValue={currentProduct?.stock}
                                {...register("stock")}
                                required
                                placeholder="Enter stock..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        {
                            isAddMode ?
                                <>
                                    <button className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`} type="submit" >
                                        Add Product
                                    </button>
                                </>
                                :
                                <>
                                    <button className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`} type="submit">
                                        Edit Product
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