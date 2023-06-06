/* eslint-disable no-lone-blocks */
import React, { useState, useEffect, useRef } from "react";
import {
    MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBBtn,
} from "mdbreact";
import "./SignIn.css"
import NavbarIcon from "../assets/navbarBrand.gif"
import { Link } from "react-router-dom";
import { Login } from "../api/auth";
import { setCookie } from "../api/api";
import { useDispatch } from "react-redux";
import { fetchProfile, setSignedIn } from "../redux/slices/ProfileSlice";
import Modal from "react-modal";
import { toast } from "react-toastify";
import FullPageIntroWithNonFixedNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function SignIn() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        setModalVisible(true)
    }, [])

    let onSubmit = async (event) => {
        event.preventDefault();
        toast.warning('Trying to login !');
        try {
            let response = await Login({
                password: passwordRef.current.value,
                email: emailRef.current.value
            })

            if (response.success === true) {
                //  set cookie 10 minutes
                setCookie("accessToken", response.token, 24)
                dispatch(setSignedIn());
                toast.dismiss()
                toast.success('Logged in! Now you can make your purchases.');
                await dispatch(fetchProfile())
            } else {
                throw new Error("Password and email failed to match.")
            }
        }
        catch (error) {
            toast.dismiss()
            toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
        }
    }


    return (
        <>
            <FullPageIntroWithNonFixedNavbar />
            <MDBContainer fluid className="main-container">
                <MDBContainer className="wrapper">
                    <div className="scaffold">
                        <MDBRow className="my-2 px-2" center>
                            <MDBCard className="mx-auto real-signin-container">
                                <MDBCardImage className="img-edit" waves="true" src={NavbarIcon} />
                                <MDBCardTitle className="text-align-center">
                                    <b > GLOBAL SOCCER SHOP </b>
                                </MDBCardTitle>
                                <MDBCardBody>
                                    <form>
                                        <MDBRow>
                                            <MDBCol className="px-5">
                                                <label htmlFor="email" className="d-block my-3 font-larger" > Email address </label>
                                                <div className="input-group my-2">
                                                    <input ref={emailRef} type="email" id="email" className="form-control my-2 font-larger" placeholder="Enter your email address" aria-describedby="basic-addon1" />
                                                </div>
                                                <label htmlFor="password" className="d-block my-3 font-larger"> Password </label>
                                                <input type="password" ref={passwordRef} id="password" className="form-control my-2 font-larger" placeholder="Enter your password" />
                                                <br />

                                                <div className="text-align-center my-3">
                                                    <MDBBtn outline color="amber lighten-1 my-2 font-larger" onClick={(event) => { onSubmit(event) }}  > Sign In </MDBBtn>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>
                                    <small className="px-5">
                                        <Link to="/signUp" className="text-dark  font-larger">
                                            <span className="text-danger  font-larger"> Sign up </span>
                                            instead. </Link>
                                        <span className="font-larger">
                                            Or sign in
                                            <span className="text-success font-larger" style={{ cursor: "pointer" }} onClick={() => {
                                                setModalVisible(true);
                                            }} >
                                                &nbsp;without setting up account.
                                            </span>
                                        </span>
                                    </small>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBRow >

                        <Modal
                            isOpen={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                            appElement={document.getElementById('app')}
                            style={{ content: { width: "300px", height: "300px", overflow: "hidden", margin: "auto" } }}
                        >
                            <h5 className="pt-5 pb-2">Demo login  by clicking the button and choosing the view</h5>
                            <div className="d-flex flex-col flex-wrap justify-content-center mt-1">
                                <MDBBtn fontWeight='bold' size='md' style={{ fontSize: "15px" }} outline color="warning" onClick={(event) => {
                                    setModalVisible(false);
                                    toast.success("Opened url in new tab!")
                                    window.open(`https://admin-football-mern-shop.netlify.app/?email=mjrrdn@gmail.com&password=123456`, "_blank");
                                    // onSubmit(event);
                                }}  > Admin
                                </MDBBtn>

                                <MDBBtn size='md' style={{ fontSize: "15px" }} outline color="warning" onClick={(event) => {
                                    setModalVisible(false);
                                    toast.success("Viewing as customer. Can also view as admin and seller")
                                    emailRef.current.value = "ridwanmonjur@gmail.com";
                                    passwordRef.current.value = "123456"
                                    onSubmit(event);
                                }}  > Seller
                                </MDBBtn>

                                <MDBBtn size='md' style={{ fontSize: "15px" }} outline color="warning" onClick={(event) => {
                                    setModalVisible(false);
                                    toast.success("Viewing as seller. Can also view as admin and customer")
                                    emailRef.current.value = "mjrrdnasm@gmail.com";
                                    passwordRef.current.value = "123456"
                                    onSubmit(event);
                                }}  > Customer
                                </MDBBtn>
                            </div>
                        </Modal>
                    </div>
                </MDBContainer >
            </MDBContainer>
            <Footer />
        </>
    );

}

export default SignIn;