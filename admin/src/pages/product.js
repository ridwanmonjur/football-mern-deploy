import { useState } from 'react';
import { fetchSSR } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { ProductList } from '@/components/product/ProductList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/sharing/table/Pagination';
import { Button, Modal } from '@/components/sharing/form';
import { ProductForm } from '@/components/product/ProductForm';
import Drawer from '@/components/layout/Drawer';

export default function ProductPage({ _productList }) {
    const [productList, setProductList] = useState(_productList)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const addToProduct = (newProduct) => {
        setProductList([...productList, newProduct])
    }
    const editProduct = (id, newProduct) => {
        setProductList(
            productList.map(value => {
                return value._id === id ? value : newProduct
            })
        )
    }
    const deletProduct = (id) => setProductList(productList.filter(value => value._id !== id))
    return (
        <Layout>
            <main
            >
                <Modal>
                    <ProductForm
                        setCurrentIndex={setCurrentIndex}
                        addToProduct={addToProduct}
                        editProduct={editProduct}
                        currentIndex={currentIndex}
                        currentProduct={currentIndex > -1 ? productList[currentIndex] : null}
                    />
                </Modal>
                <Drawer>
                    <div>
                        <Heading1 classNames="">Products</Heading1>
                        <Button
                            classNames="btn btn-primary w-64 pt-4 text-white hover:cursor-pointer"
                            onClick={() => {
                                setCurrentIndex(-1);
                                document.getElementById("my-modal").checked = !document.getElementById("my-modal").checked
                            }}
                        >
                            Add Product
                        </Button>
                        <Pagination />
                        <ProductList
                            productList={productList}
                            deletProduct={deletProduct}
                            setCurrentIndex={setCurrentIndex}
                        />
                    </div>
                </Drawer>

            </main>
        </Layout>
    )
}
export async function getServerSideProps({ req, res }) {
    try {
        const productList = await fetchSSR({ req, res }).get("product")
        console.log({ productList })
        return {
            props: {
                _productList: productList?.product || [],
            },
        }
    }
    catch (error) {
        return {
            props: {
                _productList: [],
            },
        }
        // return {
        //     redirect: {
        //         permanent: false,
        //         destination: "/",
        //     },
        //     props: {},
        // }
    }
}