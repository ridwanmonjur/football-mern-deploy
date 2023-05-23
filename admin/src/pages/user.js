import { useMemo, useState } from 'react';
import { fetchSSR } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { UserList } from '@/components/UserList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/Pagination';

export default function UserPage({ _userList }) {
    
    return useMemo(() => (
        <Layout>
            <main
                className={`min-h-screen font-primary w-11/12 lg:w-7/12 mx-auto`}
            >
                <Heading1 classNames="mt-12">Users</Heading1>
                <Pagination/>
                <UserList userList={_userList}/>
            </main>
        </Layout>
    ))
}

export async function getServerSideProps({req, res}) {
try{        
    const userList = await fetchSSR({req, res}).post("user")
    console.log({userList})
    return {
        props: {
            _userList: userList.user,
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