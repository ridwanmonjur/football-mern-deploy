import React from 'react'
import "./Home.css"
import RonaldoImg from "../assets/Ronaldo.jpg"
import BeastImg from "../assets/Beast.jpg"
import HeartbreakImg from "../assets/Heartbreak.jpg"
import RealMadridImg from "../assets/RealMadrid.jpg"
import FullPageIntroWithNonFixedNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Nike from "../assets/Nike.png"
import Puma from "../assets/Puma.png"
import NewBalance from "../assets/NewBalance.png"
import Charly from "../assets/Charly.png"
import KwikGoal from "../assets/KwikGoal.png"
import Adidas from "../assets/Adidas.png"
import { MDBCol, MDBRow, MDBContainer } from 'mdbreact'
import OverlayHome from '../components/common/OverlayCategory'
import BootsImg from "../assets/Boots.jpg"
import JerseyImg from "../assets/Jerseys.jpg"
import Hero1Img from "../assets/hero-1.webp"
import Hero2Img from "../assets/hero-2.webp"
import Hero3Img from "../assets/hero-3.webp"
import AccessoriesImg from "../assets/Accessories.jpg"
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Newsletter from '../components/common/NewsLetter'

function Home() {

    const carouselInput = [
        {
            image: RonaldoImg,
            alt: "Ronaldo",
            heading: "Age doesn't matter"
        }, {
            image: BeastImg,
            alt: "Traore",
            heading: "Beast unleashed"
        },
        {
            image: HeartbreakImg,
            alt: "Dembele",
            heading: "Never say \"Die!\""
        },
        {
            image: RealMadridImg,
            alt: "Real Madrid",
            heading: "Real Madrid wins again..."
        }
    ]

    return (
        <>
            <FullPageIntroWithNonFixedNavbar />
            <MDBContainer fluid>
                <div>
                    <div className='d-block hero-1'>
                        <div>
                            <h1 className='text-warning'>Unlock your</h1>
                            <h5 className='text-light'>soccer love</h5>
                            <p className='text-warning customFont'>with our store!</p>
                        </div>
                    </div>
                    <h1 className="customFont text-warning text-center mt-4 mb-4 mx-auto">WE HAVE YOUR TEAM</h1>
                    <MDBRow className="mx-auto ">
                        <div className="gridNew">
                            <img src={Nike} alt="Nike Logo" />
                            <img src={KwikGoal} alt="KwikGoal Logo" />
                            <img src={Puma} alt="Puma Logo" />
                            <img src={Charly} alt="Charly Logo" />
                            <img className="align-middle" src={Adidas} alt="Adidas Logo" />
                            <img className="align-middle" src={NewBalance} alt="NewBalance Logo" />
                        </div>
                    </MDBRow>
                    <div className='container text-center'>
                        <div className='row'>
                            <div className='col-lg-6 d-flex flex-column justify-content-center'>
                                <h1 className='text-warning customFont'> Welcome </h1>
                                <h4> Welcome to Global Football Store </h4>
                            </div>
                            <div className='col-lg-6'>
                                <img src={Hero1Img} className='w-75 mx-auto image-hero rounded-circle' alt="wlcome" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-6 order-fix-mobile'>
                                <img src={Hero2Img} className='w-75 mx-auto image-hero rounded-circle' alt="ecommerce" />
                            </div>
                            <div className='col-lg-6 d-flex flex-column justify-content-center'>
                                <h1 className='text-warning customFont'> Welcome </h1>
                                <h4> Welcome to Global Football Store </h4>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-6 d-flex flex-column justify-content-center'>
                                <h1 className='text-warning customFont'> Welcome </h1>
                                <h4> Welcome to Global Football Store </h4>
                            </div>
                            <div className='col-lg-6'>
                                <img src={Hero3Img} className='w-75 mx-auto image-hero rounded-circle' alt="ecommerce" />
                            </div>
                        </div>
                    </div>
                    <h1 className="customFont text-warning text-center mt-4 mb-4 mx-auto">Play like your heroes!</h1>
                    <div className='carousel-wrapper d-none d-lg-block'>
                        <Carousel
                            autoFocus={true}
                            autoPlay={true}
                            centerMode={true}
                            dynamicHeight={false}
                            // centerSlidePercentage={5}
                            showThumbs={false}
                            infiniteLoop={true}
                            showArrows={true}
                            interval={3000}>
                            {
                                carouselInput.map((value) => (
                                    <div>
                                        <img src={value.image} alt={value.alt} className="w-100 h-100" />
                                        {/* <p >{value.heading}</p> */}
                                    </div>
                                ))
                            }
                        </Carousel>
                    </div>
                    <div className='carousel-wrapper'>
                        <h1 className="text-center my-4 customFont text-warning">Categories</h1>
                        <MDBRow className='px-0'>
                            <MDBCol lg="4" className="px-0">
                                <Link to="/products/jerseys">
                                    <OverlayHome imgSrc={JerseyImg} alt="jerseys" >
                                        <p className='text-uppercase font-weight-bold'>Jerseys</p>
                                    </OverlayHome>
                                </Link>
                            </MDBCol>

                            <MDBCol lg="4" className="px-0">
                                <Link to="/products/boots">
                                    <OverlayHome imgSrc={BootsImg} alt="boots" >
                                        <p className='text-uppercase font-weight-bold'>Boots</p>
                                    </OverlayHome>
                                </Link>
                            </MDBCol>

                            <MDBCol lg="4" className="px-0">
                                <Link to="/products/accessories">
                                    <OverlayHome imgSrc={AccessoriesImg} alt="accessories" >
                                        <p className='text-uppercase font-weight-bold'>Accessories</p>
                                    </OverlayHome>
                                </Link>
                            </MDBCol>
                        </MDBRow>
                    </div>
                    <div className='mb-5'>
                        <h1 className="text-center my-0 customFont text-warning">Contact Us!</h1>
                        <Newsletter />
                    </div>
                </div >
            </MDBContainer>
            <Footer />
        </>
    )
}

export default Home
