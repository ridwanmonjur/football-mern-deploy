import { useState } from "react"
import { Table } from "../sharing/table/Table";
import { convertMongoToHumanDate } from "@/utils/convertMongoToHumanDate";
import { roundOff } from "@/utils/roundOff";
import { toastError, toastSuccess } from "@/utils/toast";
import { Loading } from "../layout/Loading";

export const CartList = ({
    cartList, setCurrentIndex, deletCart, loading
}) => {
    const [loadingIndex, setLoadingIndex] = useState(-1)
    const onDelete = async (index, id) => {
        setLoadingIndex(index);
        try {
            await fetchClient.post(`/product/delete`, {
                ids: [id]
            })
            setTimeout(() => {
                setLoadingIndex(-1);
                toastSuccess("Deleted user successfully")
                deletCart(id);
            }, 2000)
        }
        catch (error) {
            setLoadingIndex(-1);
            toastError(error);
        }
    }
    return (
        <div>
            {loading && (<div classNames="min-h-screen mx-auto" ><Loading classNames="text-green-400 mx-auto w-[50px] h-[256px]" /></div>)}
            {
                !loading &&
                <Table
                    tableHeading={["Customer name", "Updated", "Created", "Status", "Total", ""]}
                    render={
                        () => (
                            <>
                                {cartList?.map((value, index) => (
                                    <tr key={value?._id}>
                                        <th>{index + 1}</th>
                                        <td className="max-w-[300px] truncate pr-6">{value?.user?.name}</td>
                                        <td>{convertMongoToHumanDate(value?.updatedAt)}</td>
                                        <td>{convertMongoToHumanDate(value?.createdAt)}</td>
                                        <td>{value?.status} </td>
                                        <td>{value?.total > 0 ? "£ " + roundOff(value?.total) : "-"}</td>
                                        <td>
                                            <div className={`${loadingIndex === index ? "opacity-40 pointer-events-none" : ""}`}>
                                                <>
                                                    <label
                                                        htmlFor="my-modal"
                                                        onClick={() => { setCurrentIndex(index); }}
                                                        className=""
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                            className="w-6 h-6 inline text-green-500 cursor-pointer hover:text-blue-500"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                    </label>
                                                   
                                                </>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )
                    }
                />
            }
        </div>
    );
};
