/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Label, Select, Button } from "../form";
import { AddProduct, EditProduct } from "../../api/product";
import { toast } from "react-toastify";

export const ProductForm = ({
    currentProduct, setCurrentIndex, addToProduct, editProduct, currentIndex, setIsOpen
}) => {
    const isAddMode = currentProduct === null;
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data, event) => {
        setLoading(true);
        event.preventDefault();
        if (isAddMode) {
            try {
                const typeSwitcher = document.getElementById('type')
                const response = await AddProduct({
                    ...data,
                    // daisyui select removes from dom tree
                    type: typeSwitcher.value
                })
                setLoading(false);
                console.log({response})
                toast.success("Added product successfully");
                addToProduct(response);
                await setIsOpen(false)
            }
            catch (error) {
                setLoading(false);
                toast.error("Failed to add");
            }
        }
        else {
            try {
                const typeSwitcher = document.getElementById('type')
                // daisyui select removes from dom tree
                const response = await EditProduct(currentProduct._id, {
                    ...data,
                    // daisyui select removes from dom tree
                    type: typeSwitcher.value
                })
                setLoading(false);
                console.log({response})
                // toastSuccess("Edited product successfully");
                editProduct(currentProduct._id, response);
            } catch (error) {
                setLoading(false);
                // toastError(error);
            }
        }
    }
    const formRef = useRef(null)
    useEffect(() => {
        const typeSwitcher = document.getElementById('type')
        // eslint-disable-next-line eqeqeq
        if (typeSwitcher != undefined) typeSwitcher.value = currentProduct?.type;
        if (isAddMode) {
            typeSwitcher.value = "no-value"
            reset({
                type: 'no-value',
                manufacturer: '',
                name: "",
                price: 0,
                stock: 0,
            })
        }
        else {
            reset({
                type: currentProduct?.type,
                manufacturer: currentProduct?.manufacturer,
                name: currentProduct?.name,
                price: currentProduct?.price,
                stock: currentProduct?.stock,
            })
        }
    }, [currentIndex])
    return (
        <div>
            <h1 className="text-warning">
                {isAddMode ? <> Add Products... </> : <> Edit Products... </>}
            </h1>

            <form
                formRef={formRef}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="row">

                    {!isAddMode
                        &&
                        <>
                            <div className="col-10 col-lg-4 mb-2">
                                <Label text="Product id" />
                            </div>
                            <div className="col-10 col-lg-6 mb-2">
                                <Input
                                    type="text"
                                    defaultValue={currentProduct?._id}
                                    disabled={true}
                                />
                            </div>
                        </>
                    }
                    <div className="col-10 col-lg-4 mb-2">
                        <Label text="Product name" />
                    </div>
                    <div className="col-10 col-lg-6 mb-2">
                        <Input
                            type="text"
                            defaultValue={currentProduct?.name}
                            {...register("name")}
                            required
                            placeholder="Enter product name..."
                        />
                    </div>
                    <div className="col-10 col-lg-4 mb-2">
                        <Label text="Type" />
                    </div>
                    <div className="col-10 col-lg-6 mb-2">
                        <Select
                            id="type"
                            name="type"
                            classNames="w-100 py-1"
                            {...register("type")}
                            {...(!isAddMode && { defaultValue: currentProduct?.type })}
                            optionNames={["Jerseys", "Accessories", "Boots"]}
                            optionValues={["jerseys", "accessories", "boots"]}
                        />
                    </div>

                    <div className="col-10 col-lg-4 mb-2">
                        <Label text="Manufacturer" />
                    </div>
                    <div className="col-10 col-lg-6 mb-2">
                        <Input
                            type="text"
                            defaultValue={currentProduct?.manufacturer}
                            {...register("manufacturer")}
                            required
                            placeholder="Enter product manufacturer..."

                        />
                    </div>
                    <div className="col-10 col-lg-4 mb-2">
                        <Label text="Price (£)" />
                    </div>
                    <div className="col-10 col-lg-6 mb-2">
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
                    <div className="col-10 col-lg-4 mb-2">
                        <Label text="Stock" />
                    </div>
                    <div className="col-10 col-lg-6 mb-2">
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

                    {
                        isAddMode ?
                            <div className="col-10 col-lg-4 mb-2">
                                <Button classNames={`mt-4 font-larger btn-outline-warning ${loading ? "loading" : ""}`} type="submit" >
                                    Add Product
                                </Button>
                            </div>
                            :
                            <>
                                <div className="col-12">
                                    <Button classNames={`mt-4 mr-4 font-larger btn-outline-warning ${loading ? "loading" : ""}`} type="submit">
                                        Edit Product
                                    </Button>

                                    <Button classNames={`mt-4 font-larger btn-outline-warning ml-5`}
                                        onClick={() => { reset(); setCurrentIndex(-1); }}>
                                        Add mode
                                    </Button>
                                </div>
                            </>
                    }
                </div>
                <div>
                </div>
            </form >
        </div >
    )
}