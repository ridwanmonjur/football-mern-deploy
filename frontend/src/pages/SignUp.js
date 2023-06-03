/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import {
    MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBBtn
} from "mdbreact";
import "./SignIn.css"
import { Link } from "react-router-dom";
import { Signup } from "../api/auth";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import FullPageIntroWithNonFixedNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function SignUp() {

    let history = useHistory();

    let [input, setInput] = useState({
        fname: "",
        lname: "",
        password: "",
        email: ""
    })
    let onChange = async (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setInput({
            ...input,
            [name]: value
        });
    }

    let onSubmit = async (event) => {
        event.preventDefault();
        toast.warning('Trying to create an account !');
        try {
            let response = await Signup({
                name: input.fname.trim() + input.lname.trim(),
                password: input.password,
                email: input.email
            })

            if (response.success === true) {
                toast.success('Created an account! Now you can login.');

                history.push("/");

            } else {
                throw new Error("Failed to create an account.")
            }
        }
        catch (error) {
            toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
        }
    }

    return (
        <>
            <FullPageIntroWithNonFixedNavbar />
            <MDBContainer fluid className="main-container">
                <MDBContainer className="wrapper">
                    <div className="scaffold">
                        <MDBRow className="my-2 px-5" center>
                            <MDBCard className="mx-auto real-signin-container px-5">
                                <MDBCardTitle className="text-align-center mt-5">
                                    <b > GLOBAL SOCCER SHOP </b>
                                </MDBCardTitle>
                                <MDBCardBody>
                                    <form  >
                                        <MDBRow>
                                            <MDBCol>
                                                <label htmlFor="fname" className="d-block mb-3 font-larger" > First name </label>
                                                <input type="text" id="fname" name="fname" className="form-control font-larger" onChange={(event) => { onChange(event) }} placeholder="Enter your first name" />

                                                <label htmlFor="lname" className="d-block my-3 font-larger" > Last name </label>
                                                <input type="text" id="lname" name="lname" className="form-control font-larger" onChange={(event) => { onChange(event) }} placeholder="Enter your last name" />

                                                <label htmlFor="email" className="d-block my-3 font-larger" > Email address </label>
                                                <div className="input-group my-3">
                                                    <input type="email" id="email" name="email" className="form-control py-0 font-larger" onChange={(event) => { onChange(event) }} placeholder="Enter your email address" aria-describedby="basic-addon1" />
                                                </div>
                                                <label htmlFor="password" className="d-block my-3 font-larger"> Password </label>
                                                <div className="input-group my-3">
                                                    <input type="password" id="password" name="password" className="form-control font-larger" onChange={(event) => { onChange(event) }} placeholder="Enter your password" />
                                                </div>

                                                <div className="text-align-center">
                                                    <MDBBtn outline color="amber lighten-1" type="submit" className="font-larger" onClick={(event) => { onSubmit(event) }} > Sign Up </MDBBtn>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>
                                    <Link className="text-danger" to="/signIn">Already have an account? Sign in instead.</Link>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBRow >
                    </div>
                </MDBContainer >
            </MDBContainer>
            <Footer />
        </>
    );
}

export default SignUp;