/* eslint-disable no-lone-blocks */
import React, { useState, useEffect, useRef } from "react";
import {
    MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBBtn,
} from "mdbreact";
import "./SignIn.css"
import NavbarBrandImg from "../assets/navbarBrand.gif"
import { Link } from "react-router-dom";
import Spinner from "../components/notifications/spinner";
import AlertPage from "../components/notifications/alert";
import Success from "../components/notifications/success";
import { Login } from "../api/auth";
import { setCookie } from "../api/api";
import { useDispatch } from "react-redux";
import { fetchProfile, setSignedIn } from "../redux/slices/ProfileSlice";
import { GetOneUser } from "../api/profile";
import useLoadingFetchError from "../helper/loader/useFetchHook";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

function SignIn() {

    // fetch dispatch
    const { loading: loadingUser, data: user, error: errorUser } = useLoadingFetchError(GetOneUser)
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const dispatch = useDispatch()

    const [modalVisible, setModalVisible] = useState(false)
    // eslint-disable-next-line no-lone-blocks
    {/* Notification handler */ }
    // initial value
    let [notification, setNotification] = useState({
        loading: false,
        error: false,
        success: false,
    })

    useEffect(() => {
        !loadingUser && !errorUser && setModalVisible(true)
    }, [errorUser, loadingUser])

    {/* Form values handler */ }

    // initial value
    let [input, setInput] = useState({
        password: "",
        email: ""
    })
    // change value
    let onChange = async (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;
        console.log(input)
        setInput({
            ...input,
            [name]: value
        });
    }

    useEffect(() => {
        if (!loadingUser && !errorUser) {
            console.log({ user })

        }
    }, [errorUser, loadingUser])

    {/* Form values submit */ }

    let onSubmit = async (event) => {
        event.preventDefault();
        setNotification({
            loading: false,
            error: false,
            success: false
        })
        try {
            setNotification({
                ...notification,
                loading: true
            })
            let response = await Login({
                password: input.password,
                email: input.email
            })

            console.log({ response, notification })

            if (response.success === true) {
                setCookie("signInToken", response.token, 4)
                dispatch(setSignedIn());

                setNotification({
                    ...notification,
                    loading: false,
                    success: true
                })
                await dispatch(fetchProfile())
            } else {
                setNotification({
                    ...notification,
                    loading: false,
                    error: true
                })
            }
        }
        catch (error) {
            setNotification({
                ...notification,
                loading: false,
                error: true
            })
        }
    }


    return (
        <MDBContainer>
            <div className="scaffold">
                <MDBRow className="my-2 px-2" center>
                    <MDBCard className="mx-auto real-signin-container">
                        <MDBCardImage className="img-edit" waves src={NavbarBrandImg} />
                        <MDBCardTitle className="text-align-center">
                            <b > GLOBAL SOCCER SHOP </b>
                        </MDBCardTitle>
                        <MDBCardBody>
                            <form>
                                <MDBRow>
                                    <MDBCol>
                                        <label htmlFor="email" className="d-block my-3" > Email address </label>
                                        <div className="input-group my-2">
                                            <input ref={emailRef} type="email" id="email" className="form-control py-0" onChange={(event) => { onChange(event) }} placeholder="Enter your email address" aria-describedby="basic-addon1" />
                                        </div>
                                        <label htmlFor="password" className="d-block my-3"> Password </label>
                                        <input type="password" ref={passwordRef} id="password" className="form-control my-2" onChange={(event) => { onChange(event) }} placeholder="Enter your password" />
                                        <br />
                                        {notification.loading && <Spinner />}
                                        {notification.error && <AlertPage text="Not signed in" />}
                                        {notification.success && <Success text="Signed in" />}
                                        <div className="text-align-center my-3">
                                            <MDBBtn outline color="amber lighten-1 my-2" onClick={(event) => { onSubmit(event) }}  > Sign In </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </form>
                            <small>
                                <Link className="text-danger" to="/signUp" >Don't have an account? Sign up instead.</Link>
                            </small>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow >
                <Rodal visible={modalVisible} onClose={()=> setModalVisible(false)}>
                    <h5 className="pb-2 border-bottom border-warning">Visitor view</h5>
                    <h5 className="pt-5 text-align-center mb-5  bot">Choose the login view.</h5> 
                    <div className="d-flex justify-content-center mt-1 pt-2 border-warning border-top"> 
                        <MDBBtn size='md' outline color="warning" onClick={(event) => { 
                            setModalVisible(false); 
                            emailRef.current.value= user.email;
                            passwordRef.current.value = "123456"
                            onSubmit(event); }}  > Customer </MDBBtn>
                    </div>
                </Rodal>
            </div>
        </MDBContainer >

    );

}

export default SignIn;