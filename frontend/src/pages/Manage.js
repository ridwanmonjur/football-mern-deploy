import React, { useEffect, useState } from 'react'
import GridVertical from '../components/listing/GridVertical'
import { FetchAll } from '../api/product'
import FullPageIntroWithNonFixedNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { MDBBtn, MDBContainer } from 'mdbreact'
import Spinner from '../components/notifications/spinner'
import Error from '../components/notifications/error'
import { Pagination } from '../components/common/Pagination'
import QueryString from 'query-string';
import { useSelector } from 'react-redux';
import { selectProfileDetails } from '../redux/slices/ProfileSlice';
import { MDBCard, MDBCardBody } from "mdbreact";
import { TableManage } from '../components/manage/TableManage';
import Modal from 'react-modal';
import { ProductForm } from '../components/manage/ProductForm';

export function Manage() {

    const [data, setData] = useState(null);
    const user = useSelector(selectProfileDetails)
    const [query, setQuery] = useState(`seller=${user._id}&limit=12`);
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const addToProduct = (newProduct) => {
        setData((oldList) => ({ ...oldList, docs: [...oldList?.docs, newProduct] }))
    }
    const editProduct = (id, newProduct) => {
        setData((oldList) => {
            return {
                ...oldList, docs: oldList.docs.map(value => {
                    return value._id != id ? value : newProduct
                })
            }
        })
    }


    const deletProduct = (id) => setData((oldList) => ({ ...oldList, docs: oldList.docs.filter(value => value._id !== id) }))

    useEffect(() => {
        console.log({ user })
        setQuery((oldQuery) => {
            const searchParamObject = QueryString.parse(oldQuery);
            // searchParamObject['type'] = productName;
            searchParamObject['page'] = 1;
            return QueryString.stringify(searchParamObject);
        })
    }, [])
    const refreshProduct = () => {
        setLoading(true);
        FetchAll(query).then((data) => {
            setData(data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
            setError(true)
        })
    }
    useEffect(() => {

        refreshProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])
    return (
        <>
            <FullPageIntroWithNonFixedNavbar />
            <MDBContainer fluid style={{ padding: "150px 20vw 0", minHeight: "100vh" }} 
                    className='main-container'
            >
                <MDBCard
                    border="light"
                    style={{ marginTop: "50px", boxShadow: "0px 0px black !important", borderWidth: "0", outlineWidth: "0 important" }} shadow="0">
                    <MDBCardBody>
                        <Modal
                            isOpen={isOpen}
                            onRequestClose={() => setIsOpen(false)}
                            appElement={document.getElementById('app')}
                            style={{ content: { width: "500px", height: "800px", overflow: "hidden", margin: "auto" } }}
                        >
                            <ProductForm
                                setCurrentIndex={setCurrentIndex}
                                addToProduct={addToProduct}
                                editProduct={editProduct}
                                currentIndex={currentIndex}
                                currentProduct={currentIndex > -1 ? data?.docs[currentIndex] : null}
                            />
                        </Modal>
                        <div className=''>
                            {
                                !error && !loading ?
                                    (
                                        data && data.docs != undefined &&
                                        <>
                                            <h1 className="text-center text-uppercase font-weight-bolder text-warning customFont mb-4"> All Your Products</h1>
                                            <MDBBtn
                                                classNames="inline mr-4 mt-1"
                                                onClick={() => {
                                                    setCurrentIndex(-1);
                                                    setIsOpen(true);
                                                }}
                                            >
                                                Add Product
                                            </MDBBtn>
                                            <Pagination
                                                hasPrevPage={data?.hasPrevPage}
                                                hasNextPage={data?.hasNextPage}
                                                page={data?.page}
                                                totalPages={data?.totalPages}
                                                setQuery={setQuery}
                                                limit={data?.limit || 12}
                                            />
                                            <TableManage productList={data?.docs}
                                                setCurrentIndex={setCurrentIndex}
                                                deletProduct={deletProduct}
                                                loading={loading}
                                                setIsOpen={setIsOpen}
                                            />
                                        </>
                                    ) :
                                    <>
                                        {
                                            error && <div className="main-container"> <Error /> </div>
                                        }
                                        {
                                            loading && <div className="main-container"> <Spinner /> </div>
                                        }

                                    </>
                            }
                            <br />
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>

            <Footer />
        </>
    )
}

