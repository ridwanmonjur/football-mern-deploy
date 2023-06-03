/* eslint-disable eqeqeq */
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
import './Manage.css'
export function Manage() {

    const [data, setData] = useState(null);
    const user = useSelector(selectProfileDetails)
    const [query, setQuery] = useState(`seller=${user._id}&limit=12`);
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(true);
    const [error, setError] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const addToProduct = (newProduct) => {
        setData((oldList) => {
            console.log({ oldList, newProduct })
            return {
                ...oldList, docs: [...oldList?.docs, newProduct]
            }
        })
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
            console.log({ data })
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
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                appElement={document.getElementById('app')}
                className='modal-over-navbar'
            >
                <ProductForm
                    setCurrentIndex={setCurrentIndex}
                    addToProduct={addToProduct}
                    editProduct={editProduct}
                    currentIndex={currentIndex}
                    setIsOpen={setIsOpen}
                    currentProduct={currentIndex > -1 ? data?.docs[currentIndex] : null}
                />
            </Modal>
            <MDBContainer
                fluid
                style={{}}
                className='main-container manage-container'
            >
                <MDBCard
                    border="light"
                    className='manage-card'
                    shadow="0">
                    <MDBCardBody>

                        <div>
                            {
                                !error && !loading ?
                                    (
                                        data && data.docs != undefined &&
                                        <>
                                            <h1 className="text-center text-uppercase font-weight-bolder text-warning customFont mb-4"> All Your Products</h1>
                                            <MDBBtn
                                                color='accent'
                                                className="inline btn-outline-warning mr-4 mt-1 px-4 font-larger"
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

