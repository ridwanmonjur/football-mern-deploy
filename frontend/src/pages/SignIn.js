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
import { GetOneUser } from "../api/profile";
import useLoadingFetchError from "../helper/loader/useFetchHook";
import Rodal from 'rodal';
import { toast } from "react-toastify";
import FullPageIntroWithNonFixedNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function SignIn() {

    const { loading: loadingUser, data: user, error: errorUser } = useLoadingFetchError(GetOneUser)
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        !loadingUser && !errorUser && setModalVisible(true)
    }, [errorUser, loadingUser])

    let onSubmit = async (event) => {
        event.preventDefault();
        toast.warning('Trying to login !');
        try {
            let response = await Login({
                password: passwordRef.current.value,
                email: emailRef.current.value
            })

            if (response.success === true) {
                setCookie("signInToken", response.token, 4)
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
                                                <label htmlFor="email" className="d-block my-3" > Email address </label>
                                                <div className="input-group my-2">
                                                    <input ref={emailRef} type="email" id="email" className="form-control py-0" placeholder="Enter your email address" aria-describedby="basic-addon1" />
                                                </div>
                                                <label htmlFor="password" className="d-block my-3"> Password </label>
                                                <input type="password" ref={passwordRef} id="password" className="form-control my-2" placeholder="Enter your password" />
                                                <br />

                                                <div className="text-align-center my-3">
                                                    <MDBBtn outline color="amber lighten-1 my-2" onClick={(event) => { onSubmit(event) }}  > Sign In </MDBBtn>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>
                                    <small className="px-5">
                                        <Link to="/signUp" className="text-dark">Don't have an account?
                                            <span className="text-danger"> Sign up </span>
                                            instead. </Link>
                                        <span>
                                            Or sign in
                                            <span className="text-success" style={{ cursor: "pointer" }} onClick={() => {
                                                setModalVisible(true);
                                            }} >
                                                &nbsp;without setting up account.
                                            </span>
                                        </span>
                                    </small>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBRow >
                        <Rodal visible={modalVisible} onClose={() => setModalVisible(false)}>
                            <h5 className="pb-2 border-bottom border-warning">Visitor view</h5>
                            <h5 className="pt-5 text-align-center mb-5  bot">Access without sign in/ sign up...</h5>
                            <div className="d-flex justify-content-center mt-1 pt-2 border-warning border-top">
                                <MDBBtn size='md' outline color="warning" onClick={(event) => {
                                    setModalVisible(false);
                                    emailRef.current.value = user.email;
                                    passwordRef.current.value = "123456"
                                    onSubmit(event);
                                }}  > Customer View
                                </MDBBtn>
                            </div>
                        </Rodal>
                    </div>
                </MDBContainer >
            </MDBContainer>
            <Footer />
        </>
    );

}

export default SignIn;