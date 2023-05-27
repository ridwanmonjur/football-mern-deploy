import { useState } from 'react';
import { fetchSSR } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { UserList } from '@/components/user/UserList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/sharing/table/Pagination';
import { Modal, ButtonSignIn, ButtonPanel } from '@/components/sharing/form';
import { UserForm } from '@/components/user/UserForm';
import Drawer from '@/components/layout/Drawer';

export default function UserPage({ _userList }) {
    const [userList, setUserList] = useState(_userList.docs)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const addToUser = (newUser) => {
        setUserList((oldList) => ([...oldList, newUser]))
    }
    const editUser = (id, newUser) => {
        setUserList((oldList) =>
            oldList.map(value => {
                return value._id !== id ? value : newUser
            })
        )
    }
    const deletUser = (id) => setUserList(userList.filter(value => value._id !== id))
    return (
        <Layout>
            <main
            >
                <Modal>
                    <UserForm
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        addToUser={addToUser}
                        editUser={editUser}
                        currentUser={currentIndex > -1 ? userList[currentIndex] : null}
                    />
                </Modal>
                <Drawer>
                    <div>
                        <Heading1 classNames="">Users</Heading1>
                        <ButtonPanel
                            classNames="mb-3"
                            onClick={() => {
                                setCurrentIndex(-1);
                                document.getElementById("my-modal").checked = !document.getElementById("my-modal").checked
                            }}
                        >
                            Add User
                        </ButtonPanel>
                        <div className="mb-4">
                            <Pagination />
                        </div>
                        <UserList
                            userList={userList}
                            deletUser={deletUser}
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
        const userList = await fetchSSR({ req, res }).get("user")
        console.log({ userList })
        return {
            props: {
                _userList: userList || [],
            },
        }
    }
    catch (error) {
        return {
            props: {
                _userList: [],
            },
        }

    }
}
