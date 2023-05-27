import { useState } from 'react';
import { fetchSSR } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { CartList } from '@/components/cart/CartList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/sharing/table/Pagination';
import { Modal, ButtonPanel } from '@/components/sharing/form';
import { CartForm } from '@/components/cart/CartForm';
import Drawer from '@/components/layout/Drawer';

export default function CartPage({ _cartList }) {
    const [cartList, setCartList] = useState(_cartList.docs)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const addToCart = (newCart) => {
        setCartList((oldCart) => ([...oldCart, newCart]))
    }
    const editCart = (id, newCart) => {
        setCartList(
            cartList.map(value => {
                return value._id === id ? value : newCart
            })
        )
    }
    const deletCart = (id) => setCartList(cartList.filter(value => value._id !== id))
    return (
        <Layout>
            <main
            >
                <Modal>
                    <CartForm
                        setCurrentIndex={setCurrentIndex}
                        addToCart={addToCart}
                        currentIndex={currentIndex}
                        editCart={editCart}
                        currentCart={currentIndex > -1 ? cartList[currentIndex] : null}
                    />
                </Modal>
                <Drawer>
                    <div>
                        <Heading1 classNames="">Carts</Heading1>
                        <ButtonPanel
                            classNames="mb-3"
                            onClick={() => {
                                setCurrentIndex(-1);
                                document.getElementById("my-modal").checked = !document.getElementById("my-modal").checked
                            }}
                        >
                            Add Cart
                        </ButtonPanel>
                        <div className='mb-4'>
                            <Pagination />
                        </div>
                        <CartList
                            cartList={cartList}
                            deletCart={deletCart}
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
        const cartList = await fetchSSR({ req, res }).get("cart/all")
        console.log({ cartList })
        return {
            props: {
                _cartList: cartList || [],
            },
        }
    }
    catch (error) {
        return {
            props: {
                _cartList: [],
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
