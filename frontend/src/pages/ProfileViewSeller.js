/* eslint-disable eqeqeq */
import './Profile.css'
import React, { useEffect, useState } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBNav, MDBAlert } from "mdbreact";
import "./SignIn.css"
import { useForm } from "react-hook-form";
import Spinner from "../components/notifications/spinner";
import FullPageIntroWithNonFixedNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { hostNameWithoutAPI } from "../api/env";
import { GetProfileById } from '../api/profile';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';
import { FetchAll } from '../api/product';
import GridVertical from '../components/listing/GridVertical';
import { Pagination } from '../components/common/Pagination';

function ProfileViewSeller() {
    const { userId } = useParams();
    let [user, setUser] = useState({})
    const [product, setProduct] = useState(null);
    const [query, setQuery] = useState(`seller=${userId}&limit=12`);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setQuery((oldQuery) => {
            const searchParamObject = queryString.parse(oldQuery);
            searchParamObject['page'] = 1;
            return queryString.stringify(searchParamObject);
        })
        setLoading(true);
        if (user == null || Object.keys(user).length === 0) {
            GetProfileById(userId).then((data) => {
                setLoading(false);
                console.log({ data })
                setUser(data);
            })
                .catch((error) => {
                    setLoading(false);
                })
        }
    }, [])

    useEffect(() => {
        const refreshProduct = () => {
            setLoading(true);
            FetchAll(query).then((data) => {
                setProduct(data)
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
        }
        refreshProduct()
    }, [query])

    const { register, handleSubmit, reset } = useForm();

    // useEffect(() => {
    //     reset(user)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [loading])

    let updateProfile = async (_, event) => {
        event.preventDefault();
    }

    return (
        <>
            <FullPageIntroWithNonFixedNavbar />
            <MDBContainer fluid className="main-container">
                <form onSubmit={handleSubmit(updateProfile)}>
                    <div className="wrapper">
                        <div className='w-80s mx-auto'>
                            <div className="scaffold mx-auto">
                                <MDBRow center>
                                    <MDBCard className="mx-auto px-5 mb-5">
                                        {
                                            (loading === "loading" || loading === "idle") &&
                                            <div><Spinner /></div>
                                        }
                                        {
                                            user &&
                                            <div className="px-5 pt-4 pb-5">
                                                <MDBNav pills className="amber-text my-0">
                                                    <h1 className="customFont mx-auto"> SELLER'S DETAILS</h1>
                                                </MDBNav>
                                                <MDBRow className=" my-0 mx-auto d-flex justify-content-center">
                                                    <MDBCol xs="12" lg="10">
                                                        {user?.image != undefined ?
                                                            <>
                                                                <img
                                                                    className="profile-image" src={`${hostNameWithoutAPI}${user?.image}`} alt={`${user?.name}`} />
                                                            </> :
                                                            <>
                                                                <label classNames="alert alert-info font-larger" role="alert"> No image </label>
                                                            </>}
                                                    </MDBCol>
                                                    <MDBCol xs="12" lg="10" className="my-0">
                                                        <label htmlFor="name" className="my-2 font-larger">Name</label>
                                                        <input type="text" id="name"
                                                            value={user?.name}
                                                            className="form-control font-larger"
                                                        />
                                                    </MDBCol>
                                                    <MDBCol xs="12" lg="5" className="my-0">
                                                        <label htmlFor="role" className="my-2 font-larger">Role</label>
                                                        <input type="text" id="role"
                                                            value={String(user?.role)} className="form-control font-larger" />
                                                    </MDBCol>
                                                    <MDBCol xs="12" lg="5" className="my-0">
                                                        <label htmlFor="email" className="my-2 font-larger">Email address</label>
                                                        <input
                                                            type="text" id="email" className="form-control font-larger" value={user?.email} placeholder="youremail@example.com" />
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow className="my-0 mx-auto d-flex justify-content-center">
                                                    <MDBCol xs="12" lg="5" className="my-0">

                                                        <div className="">
                                                            <label htmlFor="addressFirst" className="my-2">Street Address</label>
                                                            <input
                                                                type="text"
                                                                className="form-control font-larger"
                                                                defaultValue={user?.address?.first}
                                                                {...(user?.address?.first && { placeholder: "Haven't added address yet!" })}
                                                            />
                                                        </div>
                                                    </MDBCol>
                                                    <MDBCol xs="12" lg="5" className="my-0">
                                                        <div className="">
                                                            <label htmlFor="addressSecond" className="my-2">City, Address</label>
                                                            <input
                                                                type="text"
                                                                className="form-control font-larger"
                                                                defaultValue={user?.address?.second}
                                                                {...(user?.address?.second && { placeholder: "Add your password" })}
                                                            />
                                                        </div>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow className="my-0 mx-auto d-flex justify-content-center">
                                                    <MDBCol xs="12" lg="5" className="my-0 py-0">
                                                        <label htmlFor="cc-number123">Credit card number</label>
                                                        <input type="text"
                                                            {...(user?.creditCard?.number && { placeholder: "Add your password" })}
                                                            className="form-control font-larger"
                                                            defaultValue={user?.creditCard?.number}
                                                            placeholder={"Card Number"}
                                                        />
                                                    </MDBCol>
                                                    <MDBCol xs="12" lg="5" className="my-0 py-0">
                                                        <label htmlFor="cc-cvv123">CVV</label>
                                                        <input type="text"
                                                            {...(user?.creditCard?.CVV && { placeholder: "Add your password" })}
                                                            defaultValue={user?.creditCard?.CVV}
                                                            className="form-control font-larger"
                                                            placeholder={"Card CVV"}
                                                        />
                                                    </MDBCol>

                                                </MDBRow>

                                            </div>
                                        }
                                        {
                                            product &&
                                            <>
                                                <h1 className="text-center text-uppercase font-weight-bolder text-warning customFont mb-4"> Products of this seller </h1>
                                                <div className='padding-20vw'>
                                                    <Pagination
                                                        hasPrevPage={product?.hasPrevPage}
                                                        hasNextPage={product?.hasNextPage}
                                                        page={product?.page}
                                                        totalPages={product?.totalPages}
                                                        setQuery={setQuery}
                                                        limit={product?.limit || 12}
                                                    />
                                                </div>
                                                <GridVertical type="seller" productName={"All"} data={product} />
                                            </>
                                        }
                                    </MDBCard>
                                </MDBRow >
                            </div>
                        </div >
                    </div >
                </form >

            </MDBContainer >
            <Footer />
        </>
    );
}
export default ProfileViewSeller;