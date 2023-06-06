/* eslint-disable eqeqeq */
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { DeleteProductByIds } from "../../api/product";
import { toast } from "react-toastify";
import { hostNameWithoutAPI } from "../../api/env";

function TableManage({
    productList, setCurrentIndex, deletProduct, loading, setIsOpen
}) {
    const onDelete = async (id) => {
        try {
            await DeleteProductByIds({
                ids: [id]
            })
            toast.success("Deleted successfully");
            deletProduct(id);
        }
        catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div>
            {loading && (<div classNames="min-h-screen mx-auto" >
                {/* <Lo classNames="text-green-400 mx-auto w-[50px] h-[256px]" /> */}
            </div>)}
            <>

                <MDBTable className="product-table d-none d-lg-table w-80">
                    <MDBTableHead className="form-control font-weight-bold" color="amber lighten-5">
                        <tr>
                            {['Image', 'Name', 'Type', 'Manufactuer', 'Price', 'Stock', '', ''].map((value) =>
                                <td>{value}</td>
                            )}
                        </tr>
                    </MDBTableHead>
                    <MDBTableHead>

                    </MDBTableHead>
                    <MDBTableBody>
                        {(productList || []).map((value, index) => (
                            <tr key={value?._id}>
                                <td className="">
                                    {
                                        value?.image != undefined ?
                                            <>
                                                <img
                                                    className="card-image" src={`${hostNameWithoutAPI}${value?.image}`} alt={`${value?.name}`}
                                                />
                                            </> :
                                            <>N/A</>
                                    }
                                </td>

                                <td className="">{value?.name}</td>
                                <td>{value?.manufacturer}</td>
                                <td className="uppercase">{value?.type}</td>
                                <td>£ {value?.price}</td>
                                <td>{value?.stock}</td>
                                <td style={{ width: "50px !important", padding: "0 !important", overflow: "visible" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                        className="icon-size text-info d-inline"
                                        onClick={() => { setCurrentIndex(index); setIsOpen(true) }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </td>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                        className="icon-size text-danger d-inline"
                                        onClick={() => { onDelete(value._id) }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </td>
                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>
            </>
            {/* {
                !loading &&
    <MDBTable className="product-table d-none d-lg-table w-80">


        <>
            
        </>

     </MDBTable>
            } */}
        </div >
    );
};

export default TableManage

// eslint-disable-next-line no-lone-blocks
{/*                     
                    tableHeading={["Name", "Manufacturer", "Type", "Price", "Stock", "Seller", ""]}
                    render={
                        () => ( */}