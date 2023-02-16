import React from 'react'
import "./Home.css"
import RonaldoImg from "../assets/Ronaldo.jpg"
import BeastImg from "../assets/Beast.jpg"
import HeartbreakImg from "../assets/Heartbreak.jpg"
import RealMadridImg from "../assets/RealMadrid.jpg"

import Nike from "../assets/Nike.png"
import Puma from "../assets/Puma.png"
import NewBalance from "../assets/NewBalance.png"
import Charly from "../assets/Charly.png"
import KwikGoal from "../assets/KwikGoal.png"
import Adidas from "../assets/Adidas.png"

import { MDBCol, MDBRow } from 'mdbreact'
import Overlay from '../components/Overlay'
import BootsImg from "../assets/Boots.jpg"
import JerseyImg from "../assets/Jerseys.jpg"
import AccessoriesImg from "../assets/Accessories.jpg"
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

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
        <div>
            <div className='carousel-wrapper d-none d-lg-block'>
                <Carousel
                    autoFocus={true}
                    autoPlay={true}
                    centerMode={true}
                    dynamicHeight={false}
                    // centerSlidePercentage={5}
                    infiniteLoop={true}
                    showArrows={true}
                    interval={2000}>
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
            <div style={{paddingLeft: "10%", paddingRight: "10%"}}>     
            <h1 className="text-center mb-2 mt-5">Categories</h1>
            <MDBRow className='px-0'>
                <MDBCol lg="4" className="px-0">
                    <Link to="/products/jerseys">
                        <Overlay imgSrc={JerseyImg} alt="jerseys" >
                            <p>Jerseys</p>
                        </Overlay>
                    </Link>
                </MDBCol>

                <MDBCol lg="4" className="px-0">
                    <Link to="/products/boots">
                        <Overlay imgSrc={BootsImg} alt="boots" >
                            <p>Boots</p>
                        </Overlay>
                    </Link>
                </MDBCol>

                <MDBCol lg="4" className="px-0">
                    <Link to="/products/accessories">
                        <Overlay imgSrc={AccessoriesImg} alt="accessories" >
                            <p>Accessories</p>
                        </Overlay>
                    </Link>
                </MDBCol>

            </MDBRow>


            <h1 class="brand-title-display2 font-myfirstFont text-warning text-center mt-4 mb-1 mx-auto">WE HAVE YOUR BRAND</h1>

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
            </div> 
            <br />
            <br />
        </div >
    )
}

export default Home
