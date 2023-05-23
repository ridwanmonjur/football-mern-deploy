import { useMemo, useState } from 'react';
import { fetchWithoutCookie } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { ProductList } from '@/components/ProductList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/Pagination';

export default function CartPage({ _productList }) {
    
    return useMemo(() => (
        <Layout>
            <main
                className={`min-h-screen font-primary w-11/12 lg:w-7/12 mx-auto`}
            >
                <Heading1 classNames="mt-12">Carts</Heading1>
                <Pagination/>
                <ProductList productList={_productList}/>
            </main>
        </Layout>
    ))
}

export async function getServerSideProps(context) {
    const parsedCookies = context.req.cookies;
    if (parsedCookies[process.env.CLIENT_COOKIE_ACCESS_TOKEN] == undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},
        }
    }
   const productList = await fetchWithoutCookie("cart/all")
   console.log({productList})
    return {
        props: {
            _productList: productList.product,
            cookie: parsedCookies,
            auth: parsedCookies[process.env.CLIENT_COOKIE_ACCESS_TOKEN]
        },

    }

}