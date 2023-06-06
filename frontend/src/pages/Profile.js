/* eslint-disable eqeqeq */
import './Profile.css'
import React, { useEffect } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBNav, MDBAlert } from "mdbreact";
import "./SignIn.css"
import { useSelector, useDispatch } from "react-redux";
import { selectProfileDetails, editProfile, selectStatusProfile, fetchProfile } from "../redux/slices/ProfileSlice";
import { useForm } from "react-hook-form";
import Spinner from "../components/notifications/spinner";
import FullPageIntroWithNonFixedNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { hostNameWithoutAPI } from "../api/env";

function Profile() {
    let user = useSelector(selectProfileDetails)
    let statusProfile = useSelector(selectStatusProfile)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user == null || Object.keys(user).length === 0) {
            fetchProfile()
        }
    }, [user])

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset({
            address: {
                first: user?.address?.first,
                second: user?.address?.second,
            },
            creditCard: {
                number: user?.creditCard?.number,
                CVV: user?.creditCard?.CVV
            },
            name: user?.name,
            email: user?.email,
            role: user?.role,
            image: user?.image
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusProfile])

    let updateProfile = async (data, event) => {
        event.preventDefault();
        let formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            console.log({ key, value })
            if(typeof(value) === 'object'){
                value = JSON.stringify(value)
            }
            formData.append(key, value)
        })
        formData.set("image", data.image[0]);
        await dispatch(editProfile({ body: formData }))
    }

    return (
        <>
            <FullPageIntroWithNonFixedNavbar />
            <MDBContainer fluid className="main-container">
                <form onSubmit={handleSubmit(updateProfile)}>
                    <div className="wrapper">
                        <MDBContainer>
                            <div className="scaffold mx-auto">
                                <MDBRow center>
                                    <MDBCard className="mx-auto real-profile-container px-5 mb-5">
                                        {
                                            (statusProfile === "loading" || statusProfile === "idle") &&
                                            <div><Spinner /></div>
                                        }
                                        {
                                            user &&
                                            <div className="px-5 pt-4 pb-5">
                                                <MDBNav pills className="amber-text my-0">
                                                    <h1 className="customFont"> PERSONAL DETAILS</h1>
                                                </MDBNav>
                                                <MDBRow className="px-5 my-0 mx-auto">
                                                    <MDBCol xs="12" md="12">
                                                        {user?.image != undefined ?
                                                            <>
                                                                <img
                                                                    className="profile-image" src={`${hostNameWithoutAPI}${user?.image}`} alt={`${user?.name}`} />
                                                            </> :
                                                            <>
                                                                <label classNames="alert alert-info font-larger" role="alert"> No image </label>
                                                            </>}
                                                    </MDBCol>
                                                    <MDBCol xs="12" md="12" className="col-4">
                                                        <input
                                                            type="file"
                                                            id="image"
                                                            name="image"
                                                            className="ml-n1"
                                                            multiple={false}
                                                            {...register("image")}
                                                        />
                                                    </MDBCol>
                                                    <MDBCol xs="12" md="12" className="my-0">
                                                        <label htmlFor="name" className="my-2 font-larger">Name</label>
                                                        <input type="text" id="name" {...register("name")}
                                                            value={user?.name} className="form-control font-larger"
                                                            disabled={true}
                                                        />
                                                    </MDBCol>
                                                    <MDBCol xs="12" md="6" className="my-0">
                                                        <label htmlFor="role" className="my-2 font-larger">Role</label>
                                                        <input type="text" id="role"
                                                            {...register("role")}
                                                            disabled={true}
                                                            value={String(user?.role)} className="form-control font-larger" />
                                                    </MDBCol>
                                                    <MDBCol xs="12" md="6" className="my-0">
                                                        <label htmlFor="email" className="my-2 font-larger">Email address</label>
                                                        <input
                                                            {...register("email")}
                                                            disabled={true}
                                                            type="text" id="email" className="form-control font-larger" value={user?.email} placeholder="youremail@example.com" />
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow className="px-5 mx-auto my-0">
                                                    {(!user?.address?.first || !user?.address?.second) &&
                                                        <MDBCol md="12">
                                                            <MDBAlert color="info" dismiss>
                                                                Address is required! Please add.
                                                            </MDBAlert>
                                                        </MDBCol>

                                                    }
                                                    <MDBCol xs="12" md="6" className="my-0">

                                                        <div className="">
                                                            <label htmlFor="addressFirst" className="my-2">Street Address</label>
                                                            <input
                                                                type="text"
                                                                {...register("address.first")} className="form-control font-larger"
                                                                defaultValue={user?.address?.first}
                                                                {...(user?.address?.first && { placeholder: "Haven't added address yet!" })}
                                                            />
                                                        </div>
                                                    </MDBCol>
                                                    <MDBCol xs="12" md="6" className="my-0">
                                                        <div className="">
                                                            <label htmlFor="addressSecond" className="my-2">City, Address</label>
                                                            <input
                                                                type="text"
                                                                {...register("address.second")}
                                                                className="form-control font-larger"
                                                                defaultValue={user?.address?.second}
                                                                {...(user?.address?.second && { placeholder: "Add your password" })}
                                                            />
                                                        </div>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow className="my-0 px-5 py-0 mx-auto">
                                                    {(!user?.creditCard?.number || !user?.creditCard?.CVV) &&
                                                        <MDBCol xs="12" md="12" className="my-0 py-0">
                                                            <MDBAlert color="info" dismiss>
                                                                Credit card is required! Please add.
                                                            </MDBAlert>
                                                        </MDBCol>
                                                    }
                                                    <MDBCol xs="12" md="6" className="my-0 py-0">
                                                        <label htmlFor="cc-number123">Credit card number</label>
                                                        <input type="text"
                                                            {...(user?.creditCard?.number && { placeholder: "Add your password" })}
                                                            className="form-control font-larger"
                                                            defaultValue={user?.creditCard?.number}
                                                            {...register("creditCard.number")}
                                                            placeholder={"Card Number"}
                                                            required />
                                                    </MDBCol>
                                                    <MDBCol xs="12" md="6" className="my-0 py-0">
                                                        <label htmlFor="cc-cvv123">CVV</label>
                                                        <input type="text"
                                                            {...(user?.creditCard?.CVV && { placeholder: "Add your password" })}
                                                            defaultValue={user?.creditCard?.CVV}
                                                            className="form-control font-larger"
                                                            {...register("creditCard.CVV")}
                                                            placeholder={"Card CVV"}
                                                            required />
                                                    </MDBCol>

                                                </MDBRow>
                                                <button type="submit"
                                                    className='mx-2 btn btn-sm btn-outline-warning font-larger' color="warning" outline>
                                                    Submit
                                                </button>
                                            </div>
                                        }

                                    </MDBCard>
                                </MDBRow >
                            </div>
                        </MDBContainer >
                    </div >
                </form >

            </MDBContainer >
            <Footer />
        </>
    );
}
export default Profile;