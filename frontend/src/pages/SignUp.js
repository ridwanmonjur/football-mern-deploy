import React, { useState } from "react";
import {
    MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody,  MDBCardTitle, MDBBtn
} from "mdbreact";
import "./SignIn.css"
import { Link } from "react-router-dom";

import Spinner from "../components/notifications/spinner";
import AlertPage from "../components/notifications/alert";
import Success from "../components/notifications/success";
import { signup } from "../api/auth";
import { useHistory } from "react-router-dom";


function SignIn() {

    {/* Notification handler */ }
    // initial value
    let [notification, setNotification] = useState({
        loading: false,
        error: false,
        success: false
    })

    let history = useHistory();

    {/* Form values handler */ }

    // initial value
    let [input, setInput] = useState({
        fname: "",
        lname: "",
        password: "",
        email: ""
    })
    // change value
    let onChange = async (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(input)
        setInput({
            ...input,
            [name]: value
        });
    }


    {/* Form values submit */ }

    let onSubmit = async (event) => {
        event.preventDefault();
        setNotification({
            loading: false,
            error: false,
            success: false
        })
        try {
            let response = await signup({
                name: input.fname.trim() + input.lname.trim(),
                password: input.password,
                email: input.email
            })
            setNotification({
                ...notification,
                loading: true
            })
            if (response.success === true) {
                setNotification({
                    ...notification,
                    loading: false,
                    success: true
                })

                history.push("/");

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
            })        }
    }

    {/* Recaptcha */}

     // initial value
    
    return (
        <MDBContainer>
            <div className="scaffold">
                <MDBRow className="my-2" center>
                    <MDBCard className="mx-auto real-signin-container">
                        <MDBCardTitle className="text-align-center mt-5">
                            <b > GLOBAL SOCCER SHOP </b>
                        </MDBCardTitle>
                        <MDBCardBody>
                            <form  >
                                <MDBRow>
                                    <MDBCol>
                                        <label htmlFor="fname" className="d-block mb-3" > First name </label>
                                        <input type="text" id="fname" name="fname" className="form-control" onChange={(event) => { onChange(event) }} placeholder="Enter your first name" />

                                        <label htmlFor="lname" className="d-block my-3" > Last name </label>
                                        <input type="text" id="lname" name="lname" className="form-control" onChange={(event) => { onChange(event) }} placeholder="Enter your last name" />

                                        <label htmlFor="email" className="d-block my-3" > Email address </label>
                                        <div className="input-group my-3">
                                            <input type="email" id="email" name="email" className="form-control py-0" onChange={(event) => { onChange(event) }} placeholder="Enter your email address" aria-describedby="basic-addon1" />
                                        </div>
                                        <label htmlFor="password" className="d-block my-3"> Password </label>
                                        <div className="input-group my-3">
                                            <input type="password" id="password" name="password" className="form-control" onChange={(event) => { onChange(event) }} placeholder="Enter your password" />
                                        </div>
                                     
                                        {notification.loading && <Spinner />}
                                        {notification.error && <AlertPage text="Not signed in"/>}
                                        {notification.success && <Success text="Signed in"/>}
                                        <br />
                                        <br />
                                        <div className="text-align-center">
                                            <MDBBtn outline color="amber lighten-1" type="submit" onClick={(event) => { onSubmit(event) }} > Sign Up </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </form>
                            <small>
                                <Link className="text-danger" to="/signIn">Already have an account? Sign in instead.</Link>
                            </small>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow >
            </div>
        </MDBContainer >

    );

}

export default SignIn;