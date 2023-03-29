
import React from "react";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBCard, MDBNav, MDBIcon, MDBAlert } from "mdbreact";
import "./SignIn.css"
import { useSelector, useDispatch } from "react-redux";
import { selectProfileDetails, editProfile, selectStatusProfile } from "../redux/slices/ProfileSlice";
import { useForm } from "react-hook-form";
import Spinner from "../components/notifications/spinner";
import FullPageIntroWithNonFixedNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Profile() {
    let user = useSelector(selectProfileDetails)
    let statusProfile = useSelector(selectStatusProfile)
    const dispatch = useDispatch()
    let toggleCollapse1 = (collapseID) => () => {
        let collapse = document.getElementById(collapseID);
        collapse.classList.toggle("d-none");
    }

    const { register: register1, handleSubmit: handleSubmit1 } = useForm();
    const { register: register2, handleSubmit: handleSubmit2 } = useForm();

    let updateAddress = async ({ addressFirst, addressSecond }) => {
        await dispatch(editProfile({ body: { addressFirst, addressSecond } }))
    }
    let updateCard = async ({ creditCardNumber, creditCardCVV }) => {
        await dispatch(editProfile({ body: { creditCardNumber, creditCardCVV } }))
    }
    return (
        <>
            <FullPageIntroWithNonFixedNavbar />
            <MDBContainer fluid className="main-container">
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
                                        user && statusProfile === "success" &&
                                        <>
                                            <MDBRow className="px-5 my-0 mx-auto w-75 ">
                                                <MDBNav pills className="mx-auto amber-text my-0 prepostTitle d-flex flex-column justify-content-center">
                                                    <h2> PERSONAL DETAILS</h2>
                                                </MDBNav>
                                                <MDBCol md="12" className="my-0">
                                                    <div className="">
                                                        <label htmlFor="name" className="my-2">Name</label>
                                                        <input type="text" id="name" value={user.name} className="form-control" />
                                                        <label htmlFor="role" className="my-2">Role</label>
                                                        <input type="text" id="role" value={String(user?.role)} className="form-control" />
                                                        <label htmlFor="email" className="my-2">Email address</label>
                                                        <input type="text" id="email" className="form-control" value={user.email} placeholder="youremail@example.com" />
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>
                                            <form onSubmit={handleSubmit1(updateAddress)}>
                                                <MDBRow className="px-5 mx-auto my-0 w-75">
                                                    <MDBCol md="12">
                                                        <div>
                                                            <MDBNav pills className="amber-text nav-justified">
                                                                <div className="d-block d-lg-flex justify-content-between w-100">
                                                                    <h3>
                                                                        <span>Address</span>
                                                                        <  MDBIcon icon="angle-down"
                                                                            size="sm"
                                                                            className="ml-4"
                                                                            onClick={toggleCollapse1("basicCollapse1")}
                                                                        />
                                                                    </h3>
                                                                    <MDBBtn type="submit"
                                                                        className='mx-2' color="warning" outline>
                                                                        Submit
                                                                    </MDBBtn>

                                                                </div>
                                                            </MDBNav>
                                                            <div id="basicCollapse1" className="d-none ">
                                                                <div className="my-3">
                                                                    <>
                                                                        {(!user.addressFirst || !user.addressSecond) &&
                                                                            <MDBAlert color="info" dismiss>
                                                                                Address is required! Please add.
                                                                            </MDBAlert>
                                                                        }
                                                                        <div className="">
                                                                            <label htmlFor="addressFirst" className="my-2">Street Address</label>
                                                                            <input
                                                                                type="text"
                                                                                {...register1("addressFirst")} className=" form-control"
                                                                                defaultValue={user.addressFirst}
                                                                                {...(user.addressFirst && { placeholder: "Haven't added address yet!" })}
                                                                            />
                                                                        </div>
                                                                        <div className="">
                                                                            <label htmlFor="addressSecond" className="my-2">City, Address</label>
                                                                            <input
                                                                                type="text"
                                                                                {...register1("addressSecond")}
                                                                                className="form-control"
                                                                                defaultValue={user.addressSecond}
                                                                                {...(user.addressSecond && { placeholder: "Add your password" })}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </MDBCol>
                                                </MDBRow>
                                            </form>
                                            <form onSubmit={handleSubmit2(updateCard)}>
                                                <MDBRow className="my-0 px-5 mx-auto w-75">
                                                    <MDBCol md="12">
                                                        <MDBNav pills className="nav-justified amber-text">
                                                            <div className="d-block d-lg-flex justify-content-between w-100">
                                                                <h3>
                                                                    <span>Billing</span>
                                                                    <  MDBIcon icon="angle-down"
                                                                        size="sm"
                                                                        className="ml-4"
                                                                        onClick={toggleCollapse1("basicCollapse2")}
                                                                    />
                                                                </h3>
                                                                <MDBBtn type="submit"
                                                                    className='mx-2 mt-2' color="warning" outline>
                                                                    Submit
                                                                </MDBBtn>
                                                            </div>
                                                        </MDBNav>
                                                        <div id="basicCollapse2" className="d-none">
                                                            <div className="my-3">
                                                                <>
                                                                    {(!user.creditCardNumber || !user.creditCardCVV) &&
                                                                        <MDBAlert color="info" dismiss>
                                                                            Credit card is required! Please add.
                                                                        </MDBAlert>
                                                                    }
                                                                    <div className="mb-2">
                                                                        <label htmlFor="cc-number123">Credit card number</label>
                                                                        <input type="text"
                                                                            {...(user.creditCardNumber && { placeholder: "Add your password" })}
                                                                            className="form-control"
                                                                            defaultValue={user.creditCardNumber}
                                                                            {...register2("creditCardNumber")}
                                                                            placeholder={"Card Number"}
                                                                            required />
                                                                    </div>
                                                                    <div className="">
                                                                        <label htmlFor="cc-cvv123">CVV</label>
                                                                        <input type="text"
                                                                            {...(user.creditCardCVV && { placeholder: "Add your password" })}
                                                                            defaultValue={user.creditCardCVV}
                                                                            className="form-control"
                                                                            {...register2("creditCardCVV")}
                                                                            placeholder={"Card CVV"}
                                                                            required />
                                                                    </div>
                                                                </>
                                                            </div>
                                                        </div>
                                                    </MDBCol>
                                                </MDBRow>
                                            </form>
                                        </>
                                    }
                                </MDBCard>
                            </MDBRow >
                        </div>
                    </MDBContainer >
                </div>
            </MDBContainer>
            <Footer />
        </>
    );
}
export default Profile;