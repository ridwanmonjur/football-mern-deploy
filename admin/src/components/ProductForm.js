import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import fetchWithCookie from "../../api/fetchWithCookie";
export const ProductForm = ({
    currentProduct,
    mode,
    handleCurrentProductIndex,
    addProduct,
    editProduct
}) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data, event) => {
        setLoading(true);
        event.preventDefault();
        if (mode === "ADD") {
            try {
                const response = await fetchWithCookie.post('/product', data)
                await setTimeout(() => {
                    setLoading(false);
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    addProduct({ ...response.data });
                }, 3000);
            }
            catch (error) {
                if (loading) setLoading(false);
                toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
            }
        }
        else {
            try {
                const response = await fetchWithCookie.put(`/product/${currentProduct._id}`, {
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
    return (
        <div>
            <h1 className='pt-12 pb-5 text-xl font-bold'>
                {mode === "ADD" ? <> Add Products... </> : <> Edit Products... </>}
            </h1>

            <form
                formRef={formRef}
                className="font-medium"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mx-auto">
                    <input
                        type="text"
                        defaultValue={currentProduct.title}
                        {...register("title")}
                        required
                        placeholder="Enter your title..."
                        className="input input-bordered dark:bg-white inline w-full  mb-2"
                    />
                    <textarea id="message"
                        defaultValue={currentProduct.description}
                        {...register("description")}
                        required
                        title="Enter your desc please"
                        placeholder="Enter your description please..."
                        className="textarea textarea-bordered dark:bg-white w-full"
                        rows={3}
                    ></textarea>
                    <div className="flex justify-center">
                        {
                            mode === "ADD" ?
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
                                        onClick={() => { reset(); handleCurrentProductIndex(-1); }}>
                                        Add mode
                                    </button>
                                </>
                        }
                    </div>

                </div>
            </form>
        </div>
    );
};

