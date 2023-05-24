import { useMemo, useState } from 'react';
import { fetchSSR } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { CartList } from '@/components/cart/CartList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/sharing/table/Pagination';
import { Modal } from '@/components/sharing/form';
import { CartForm } from '@/components/cart/CartForm';

export default function CartPage({ _cartList }) {
    const [cartList, setCartList] = useState(_cartList)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const addToCart = (newCart) => {
        setCartList([...cartList, newCart])
    }
    const editCart = (id, newCart) => {
        setCartList(
            cartList.map(value => {
                return value._id === id ? value : newCart
            })
        )
    }
    const deletCart = (id) => setCartList(cartList.filter(value => value._id !== id))
    return useMemo(()=>(
        <Layout>
            <main
                className={`min-h-screen font-primary w-11/12 lg:w-7/12 mx-auto`}
            >
                <Modal>
                    <CartForm
                        setCurrentIndex={setCurrentIndex}
                        addToCart={addToCart}
                        editCart={editCart}
                        currentCart={currentIndex > -1 ? cartList[currentIndex] : null}
                    />
                </Modal>
                <Heading1 classNames="mt-12">Carts</Heading1>
                <Pagination />
                <CartList
                    cartList={cartList}
                    deletCart={deletCart}
                    setCurrentIndex={setCurrentIndex}
                />
            </main>
        </Layout>
    ))
}
export async function getServerSideProps({ req, res }) {
    try {
        const cartList = await fetchSSR({ req, res }).get("cart")
        return {
            props: {
                _cartList: cartList.cart,
            },

        }
    }
    catch (error) {
        console.log({ error })
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},
        }
    }
}
