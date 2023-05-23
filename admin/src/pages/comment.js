import { useMemo, useState } from 'react';
import { fetchSSR } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { ProductList } from '@/components/ProductList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/Pagination';

export default function Home({ _productList }) {
    
    return useMemo(() => (
        <Layout>
            <main
                className={`min-h-screen font-primary w-11/12 lg:w-7/12 mx-auto`}
            >
                <Heading1 classNames="mt-12">Products</Heading1>
                <Pagination/>
                <ProductList productList={_productList}/>
            </main>
        </Layout>
    ))
}

export async function getServerSideProps(context) {
    const parsedCookies = context.req.cookies;
    if (parsedCookies[process.env.CLIENT_COOKIE_ACCESS_TOKEN] == undefined ) {
        try{
            const productList = await fetchSSR("product")
            return {
                props: {
                    _productList: productList.product,
                    cookie: parsedCookies,
                    auth: parsedCookies[process.env.CLIENT_COOKIE_ACCESS_TOKEN]
                },
        
            }
        }
        catch(error){
            console.log({error})
            return {
                redirect: {
                    permanent: false,
                    destination: "/",
                },
            props: {},
            }
        }
    }

}