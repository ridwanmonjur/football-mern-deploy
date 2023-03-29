import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileNull, selectIsSignedIn } from "../../redux/slices/ProfileSlice";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBIcon } from 'mdbreact';
import NavbarBrandImg from "../../assets/navbarBrand.gif"
import "./Navbar.css"
import { setCookie } from '../../api/api';
import { cookieKey } from '../../api/env';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { setCartNull } from '../../redux/slices/CartSlice';

function FullPageIntroWithNonFixedNavbar() {

    let history = useHistory();

    let params = useParams()

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
        event.preventDefault()
        dispatch(setProfileNull())
        history.replace("/")
        dispatch(setCartNull())
        toast.info("Logged out successfully")
        setCookie(cookieKey, null, 1)
    }

    useEffect(() => {
        let button = document.querySelector('.navbar-toggler');
        button.classList.add('navbar-toggler-special')
    }, [state]);

    useEffect(() => {
        var myNav = document.getElementById('mynav');
        const location = history.location.pathname
        const isNavTransparent = location === "/" || (location.includes("products") && !('userId' in params))
        if (isNavTransparent){
            myNav.classList.add("nav-transparent");
            window.onscroll = function () {
                if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200) {
                    myNav.classList.add("nav-colored");
                    myNav.classList.remove("nav-transparent");
                }
                else {
                    myNav.classList.add("nav-transparent");
                    myNav.classList.remove("nav-colored");
                }
            };
        }
        else{
            myNav.classList.add("nav-colored");
        }
       
    }, [history.location.pathname, params])

    return (
        <div>
            <header>
                <MDBNavbar fixed="top" light expand="lg" id="mynav">
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


                                <MDBNavItem>
                                    <MDBNavLink to="/purchases">Purchases</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem style={{ position: "relative", top: "1vh" }} className="ml-2">
                                    <MDBNavLink to="/cart" className="d-inline cart-icon">
                                        <MDBIcon icon="cart-arrow-down" />
                                    </MDBNavLink>
                                    {
                                        !isSignedIn &&
                                        <MDBNavLink to="/signIn" className="d-inline">
                                            <MDBIcon icon="sign-in-alt" />
                                        </MDBNavLink>
                                    }
                                    {
                                        isSignedIn &&
                                        <MDBIcon icon="sign-out-alt" onClick={(evt) => { resetUser(evt) }} />
                                    }
                                    {
                                        isSignedIn &&
                                        <MDBNavLink to="/profile" className="d-inline">
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