import { useState } from 'react';
import { fetchSSR } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { ProductList } from '@/components/product/ProductList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/sharing/table/Pagination';
import { ButtonPanel, Modal } from '@/components/sharing/form';
import { ProductForm } from '@/components/product/ProductForm';
import Drawer from '@/components/layout/Drawer';

export default function ProductPage({ _productList }) {
    const [productList, setProductList] = useState(_productList.docs)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const addToProduct = (newProduct) => {
        setProductList((oldList) => ([...oldList, newProduct]))
    }
    const editProduct = (id, newProduct) => {
        setProductList((oldList) =>
            oldList.map(value => {
                return value._id !== id ? value : newProduct
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
                        <div>
                            <ButtonPanel
                                classNames="mb-3"
                                onClick={() => {
                                    setCurrentIndex(-1);
                                    document.getElementById("my-modal").checked = !document.getElementById("my-modal").checked
                                }}
                            >
                                Add Product
                            </ButtonPanel>
                        </div>
                        <div className="mb-4">
                            <Pagination />
                        </div>
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
                _productList: productList || [],
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
