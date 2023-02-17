import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileNull, selectIsSignedIn } from "../redux/slices/ProfileSlice";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBIcon } from 'mdbreact';
import NavbarBrandImg from "../assets/navbarBrand.gif"
import "./Navbar.css"
// import { useHistory } from "react-router-dom";
import { getCookie, setCookie } from '../api/api';
import { cookieKey } from '../api/env';

function FullPageIntroWithNonFixedNavbar() {

    // let history = useHistory();

    let isSignedIn = useSelector(selectIsSignedIn);

    const dispatch = useDispatch()
    let [state, setState] = useState({
        collapse: false,
        isWideEnough: false,
    })

    function onClick() {
        let button = document.querySelector('.navbar-toggler');
        button.classList.toggle('navbar-toggler-special')
        setState((prevState) => {
            return {
                ...prevState,
                collapse: !prevState.collapse,
                isSignedIn
            }
        });
    }

    function resetUser(event) {

        const token = getCookie(cookieKey)
        console.log({ token })
        alert("Log out")
        event.preventDefault()
        dispatch(setProfileNull())

        window.location.reload()

        setCookie(cookieKey, null, 1)
        setState((prevState) => {
            return {
                ...prevState,
                isSignedIn: false
            }
        });
    }

    useEffect(() => {
        let button = document.querySelector('.navbar-toggler');
        button.classList.add('navbar-toggler-special')
    }, [state]);

    return (
        <div>
            <header>
                <MDBNavbar fixed="top" light expand="lg" className="navbar-custom" >
                    <MDBContainer>
                        <MDBNavbarBrand href="/" className="text-danger">
                            <img className="header-img" src={NavbarBrandImg} alt="Firefootball" />
                            <strong className="d-none d-sm-inline">GLOBAL FOOTBALL STORE</strong>
                            <strong className="d-inline d-sm-none" style={{ fontSize: "17px" }}>GLOBAL FOOTBALL STORE</strong>

                        </MDBNavbarBrand>
                        <MDBNavbarToggler size="sm" onClick={onClick} />
                        <MDBCollapse onClick={onClick} isOpen={state.collapse} navbar className="py-3" >
                            <MDBNavbarNav right >
                                <MDBNavItem >
                                    <MDBNavLink className="text-danger" to="/">Home</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink className="text-danger" to="/products/jerseys">Jerseys</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink className="text-danger" to="/products/boots">Boots</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink className="text-danger" to="/products/accessories">Accessories</MDBNavLink>
                                </MDBNavItem>


                                <MDBNavItem>
                                    <MDBNavLink className="text-danger" to="/purchases">Purchases</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem style={{ position: "relative", top: "1vh" }} className="ml-2">
                                    <MDBNavLink to="/cart" className="d-inline cart-icon">
                                        <MDBIcon className="text-danger" icon="cart-arrow-down" />
                                    </MDBNavLink>
                                    {
                                        !isSignedIn &&
                                        <MDBNavLink to="/signIn" className="d-inline">
                                            <MDBIcon className="text-danger" icon="sign-in-alt" />
                                        </MDBNavLink>
                                    }
                                    {
                                        isSignedIn &&
                                        <MDBIcon className="text-danger" icon="sign-out-alt" onClick={(evt) => { resetUser(evt) }} />
                                    }
                                    {
                                        isSignedIn &&
                                        <MDBNavLink to="/profile" className="d-inline">
                                            <MDBIcon className="text-danger" far icon="user-circle" />
                                        </MDBNavLink>
                                    }

                                </MDBNavItem>



                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBContainer>
                </MDBNavbar>
            </header>
        </div >
    );
}

export default FullPageIntroWithNonFixedNavbar;