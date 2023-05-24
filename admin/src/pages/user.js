import { useMemo, useState } from 'react';
import { fetchSSR } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { UserList } from '@/components/user/UserList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/sharing/table/Pagination';
import { Modal } from '@/components/sharing/form';
import { UserForm } from '@/components/user/UserForm';

export default function UserPage({ _userList }) {
    const [userList, setUserList] = useState(_userList)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const addToUser = (newUser) => {
        setUserList([...userList, newUser])
    }
    const editUser = (id, newUser) => {
        setUserList(
            userList.map(value => {
                return value._id === id ? value : newUser
            })
        )
    }
    const deletUser = (id) => setUserList(userList.filter(value => value._id !== id))
    return useMemo(()=>(
        <Layout>
            <main
                className={`min-h-screen font-primary w-11/12 lg:w-7/12 mx-auto`}
            >
                <Modal>
                    <UserForm
                        setCurrentIndex={setCurrentIndex}
                        addToUser={addToUser}
                        editUser={editUser}
                        currentUser={currentIndex > -1 ? userList[currentIndex] : null}
                    />
                </Modal>
                <Heading1 classNames="mt-12">Users</Heading1>
                <Pagination />
                <UserList
                    userList={userList}
                    deletUser={deletUser}
                    setCurrentIndex={setCurrentIndex}
                />
            </main>
        </Layout>
    ))
}
export async function getServerSideProps({ req, res }) {
    try {
        const userList = await fetchSSR({ req, res }).get("user")
        return {
            props: {
                _userList: userList.user,
            },

        }
    }
    catch (error) {
        // console.log({ error })
        return {
            props: {
                _userList: [],
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
