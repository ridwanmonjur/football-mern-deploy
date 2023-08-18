import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileNull, selectIsSignedIn, selectProfileDetails } from "../../redux/slices/ProfileSlice";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBIcon } from 'mdbreact';
import NavbarBrandImg from "../../assets/icon.png"
import "./Navbar.css"
import { setCookie } from '../../api/api';
import { cookieKey } from '../../api/env';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { setCartNull } from '../../redux/slices/CartSlice';

function FullPageIntroWithNonFixedNavbar() {

    let history = useHistory();

    let params = useParams()

    const isSignedIn = useSelector(selectIsSignedIn);

    const user = useSelector(selectProfileDetails);

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
        event.preventDefault()
        dispatch(setProfileNull())
        history.replace("/")
        dispatch(setCartNull())
        toast.info("Logged out successfully")
        // 10minutes
        setCookie(cookieKey, null, 24)
    }

    useEffect(() => {
        // var isSmallScreen = window.matchMedia("(min-width: 1000px)").matches
        // if (!isSmallScreen) return;
        // let button = document.querySelector('.navbar-toggler');
        // button.classList.add('navbar-toggler-special')
    }, [state]);

    useEffect(() => {
        var myNav = document.getElementById('mynav');
        const location = history.location.pathname
        const isNavTransparent = location === "/" || (location.includes("products") && !('userId' in params))
        var isLargeScreen = window.matchMedia("(min-width: 1200px)").matches
        console.log({ isLargeScreen })
        if (isNavTransparent && isLargeScreen) {
            myNav.classList.add("nav-transparent");
            window.onscroll = function () {
                if (document.body.scrollTop >= 400 || document.documentElement.scrollTop >= 400) {
                    myNav.classList.add("nav-colored");
                    myNav.classList.remove("nav-transparent");
                }
                else {
                    myNav.classList.add("nav-transparent");
                    myNav.classList.remove("nav-colored");
                }
            };
        }
        else {
            myNav.classList.add("nav-colored");
        }

    }, [history.location.pathname, params])

    return (
        <div>
            <header>
                <MDBNavbar fixed="top" light expand="xl" id="mynav">
                    <MDBContainer>
                        <MDBNavbarBrand href="/" className="text-danger">
                            <img className="header-img" src={NavbarBrandImg} alt="Firefootball" />
                            <strong className="d-none d-lg-inline">GLOBAL FOOTBALL STORE</strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler size="sm" onClick={onClick} />
                        <MDBCollapse onClick={onClick} isOpen={state.collapse} navbar className="py-3" >
                            <MDBNavbarNav right >
                                <MDBNavItem>
                                    <MDBNavLink to="/">Home</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/products/jerseys">Jerseys</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/products/boots">Boots</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/products/accessories">Accessories</MDBNavLink>
                                </MDBNavItem>
                                {
                                    user?.role === "customer" &&
                                    <MDBNavItem>
                                        <MDBNavLink to="/purchases">Purchases</MDBNavLink>
                                    </MDBNavItem>
                                }
                                {
                                    user?.role === "seller" &&
                                    <MDBNavItem>
                                        <MDBNavLink to="/manage">Manage</MDBNavLink>
                                    </MDBNavItem>
                                }
                                <MDBNavItem style={{ position: "relative", top: "1vh" }} className="ml-2">
                                    {
                                        user?.role === "customer" &&
                                        <MDBNavLink to="/cart" className="d-inline cart-icon">
                                            <MDBIcon icon="cart-arrow-down" />
                                        </MDBNavLink>
                                    }
                                    {
                                        !isSignedIn &&
                                        <MDBNavLink to="/signIn" className="d-inline ml-2">
                                            <MDBIcon icon="sign-in-alt" />
                                        </MDBNavLink>
                                    }
                                    {
                                        isSignedIn &&
                                        <span className='emulate-icon'>
                                            <svg
                                                onClick={(evt) => { resetUser(evt) }} 
                                                xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-log-out emulate-icon"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                            {/* <MDBIcon icon="sign-out-alt" className='d-inline ml-2' onClick={(evt) => { resetUser(evt) }} /> */}
                                        </span>
                                    }
                                    {
                                        isSignedIn &&
                                        <MDBNavLink to="/profile" className="d-inline ml-2">
                                            <MDBIcon far icon="user-circle" />
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