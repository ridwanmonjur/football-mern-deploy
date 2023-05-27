import fetchClient from "../../../api/fetchClient";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Input, LabelModal, Select, ButtonPanel } from "../sharing/form";

export const ProductForm = ({
    currentProduct, setCurrentIndex, addToProduct, editProduct, currentIndex
}) => {
    console.log({ currentProduct })
    const isAddMode = currentProduct === null;
    const { register, handleSubmit, setValue, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data, event) => {
        setLoading(true);
        event.preventDefault();
        if (isAddMode) {
            try {
                const typeSwitcher = document.getElementById('type')
                const response = await fetchClient.post('/product', {
                    ...data,
                    // daisyui select removes from dom tree
                    type: typeSwitcher.value
                })
                setLoading(false);
                toast.success("Added product", {
                    position: toast.POSITION.TOP_RIGHT
                });
                addToProduct(response.product);
            }
            catch (error) {
                setLoading(false);
                toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
            }
        }
        else {
            try {
                const typeSwitcher = document.getElementById('type')
                // daisyui select removes from dom tree
                console.log({ data, typeSwitcher, value: typeSwitcher.value })
                const response = await fetchClient.put(`/product/${currentProduct._id}`, {
                    ...data,
                    // daisyui select removes from dom tree
                    type: typeSwitcher.value
                })
                console.log({ data })
                setLoading(false);
                toast.success("Edited product", {
                    position: toast.POSITION.TOP_RIGHT
                });
                editProduct(currentProduct._id, response.product);
            } catch (error) {
                setLoading(false);
                toastError(error);
            }
        }
    }
    const formRef = useRef(null)
    useEffect(() => {
        const typeSwitcher = document.getElementById('type')
        if (typeSwitcher != undefined) typeSwitcher.value = currentProduct?.type;
        if (isAddMode) {
            typeSwitcher.value = "no-value"
            reset({
                type: 'no-value',
                manufacturer: '',
                name: "",
                price: 0,
                seller: "",
                stock: 0,
            })
        }
        else {
            reset({
                type: currentProduct?.type,
                manufacturer: currentProduct?.manufacturer,
                name: currentProduct?.name,
                price: currentProduct?.price,
                seller: currentProduct?.seller?._id,
                stock: currentProduct?.stock,
            })
        }
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
                                disabled={true}
                            />
                        </>
                    }
                    <div className="grid lg:grid-cols-2">
                        <div>
                            {/* Type */}
                            <>
                                <LabelModal text="Type" />
                                <Select
                                    // daisyui broken so need it
                                    id="type"
                                    name="type"
                                    {...register("type")}
                                    {...(!isAddMode && { defaultValue: currentProduct?.type })}
                                    optionNames={["Jerseys", "Accessories", "Boots"]}
                                    optionValues={["jerseys", "accessories", "boots"]}
                                />
                            </>
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
                                type="number"
                                defaultValue={currentProduct?.price}
                                {...register("price",
                                    {
                                        valueAsNumber: true,
                                    })}
                                required
                                placeholder="Enter price..."

                            />
                        </div>
                        <div>
                            {/* Manufacturer */}
                            <LabelModal text="Stock" />
                            <Input
                                type="number"
                                defaultValue={currentProduct?.stock}
                                {...register("stock",
                                    {
                                        valueAsNumber: true,
                                    })}
                                required
                                placeholder="Enter stock..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        {
                            isAddMode ?
                                <>
                                    <ButtonPanel classNames={`mt-4 ${loading ? "loading" : ""}`} type="submit" >
                                        Add Product
                                    </ButtonPanel>
                                </>
                                :
                                <>
                                    <ButtonPanel classNames={`mt-4 ${loading ? "loading" : ""}`} type="submit">
                                        Edit Product
                                    </ButtonPanel>
                                    <ButtonPanel classNames={`mt-4 ml-5`}
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