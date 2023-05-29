import { useEffect, useMemo, useState } from 'react';
import { fetchSSR } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { CartList } from '@/components/cart/CartList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/sharing/table/Pagination';
import { ButtonPanel, Modal } from '@/components/sharing/form';
import { CartForm } from '@/components/cart/CartForm';
import Drawer from '@/components/layout/Drawer';
import fetchClient from '../../api/fetchClient';
import { SortCart } from '@/components/cart/SortCart';
import { FilterTab } from '@/components/cart/FilterTab';

export default function CartPage({ _cartList }) {
    const [cartList, setCartList] = useState(_cartList)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [query, setQuery] = useState('')
    const [isFirstTime, setIsFirstTime] = useState(true)
    const [loading, setLoading] = useState(false)
    const addToCart = (newCart) => {
        setCartList((oldList) => ({ ...oldList, docs: [...oldList?.docs, newCart] }))
    }
    const refreshCart = async () => {
        setLoading(true)
        const cartList = await fetchClient.get(`cart/all/?${query}`)
        setTimeout(() => {
            setLoading(false)
            setCartList(cartList)
        }, [2000],
        )
    }
    const editCart = (id, newCart) => {
        setCartList((oldList) => {
            return {
                ...oldList, docs: oldList.docs.map(value => {
                    return value._id != id ? value : newCart
                })
            }
        })
    }
    useEffect(() => {
        if (!isFirstTime) refreshCart()
    }, [query])
    useEffect(() => {
        setIsFirstTime(false)
    }, [])
    const deletCart = (id) => setCartList((oldList) => ({ ...oldList, docs: cartList.docs.filter(value => value._id !== id) }))
    return (
        <Layout>
            <main
            >
                <Modal>
                    <CartForm
                        setCurrentIndex={setCurrentIndex}
                        addToCart={addToCart}
                        editCart={editCart}
                        currentIndex={currentIndex}
                        currentCart={currentIndex > -1 ? cartList.docs[currentIndex] : null}
                    />
                </Modal>
                <Drawer>
                    <div className="px-12 py-12">
                        <Heading1 classNames="flex">
                            <span>Carts</span>
                            <span><FilterTab setQuery={setQuery} /></span>
                            </Heading1>
                        <div className='flex mb-4'>
                            <ButtonPanel
                                classNames="inline mr-4 mt-1"
                                onClick={() => {
                                    setCurrentIndex(-1);
                                    document.getElementById("my-modal").checked = !document.getElementById("my-modal").checked
                                }}
                            >
                                Add Cart
                            </ButtonPanel>
                            <SortCart setQuery={setQuery} />
                        </div>
                        <CartList
                            loading={loading}
                            cartList={cartList?.docs}
                            deletCart={deletCart}
                            setCurrentIndex={setCurrentIndex}
                            refreshCart={refreshCart}
                        />
                        <div className="mt-4">
                            <Pagination
                                hasPrevPage={cartList?.hasPrevPage}
                                hasNextPage={cartList?.hasNextPage}
                                page={cartList?.page}
                                totalPages={cartList?.totalPages}
                                setQuery={setQuery}
                            />
                        </div>
                    </div>
                </Drawer>
            </main>
        </Layout>
    )
}
export async function getServerSideProps({ req, res }) {
    try {
        const cartList = await fetchSSR({ req, res }).get("cart/all")
        return {
            props: { _cartList: cartList || [] },
        }
    }
    catch (error) {
        return {
            props: { _cartList: [] },
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
