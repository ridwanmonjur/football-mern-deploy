import React from 'react'
import "./Home.css"
import FullPageIntroWithNonFixedNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Nike from "../assets/Nike.png"
import Puma from "../assets/Puma.png"
import NewBalance from "../assets/NewBalance.png"
import Charly from "../assets/Charly.png"
import KwikGoal from "../assets/KwikGoal.png"
import Adidas from "../assets/Adidas.png"
import { MDBRow } from 'mdbreact'
import Newsletter from '../components/common/NewsLetter'
import Hero1 from '../components/common/Hero1'
import OverlayHome from '../components/common/OverlayHome';
import Hero2 from '../components/common/Hero2'
import Hero0 from '../components/common/Hero0'

function Home() {

    return (
        <>
            <FullPageIntroWithNonFixedNavbar />
            <div>
                <div>
                    <div className='d-block hero-1'>
                        <div>
                            <h1 className='text-warning'>Unlock your</h1>
                            <h5 className='text-light'>soccer love</h5>
                            <h3 className='text-warning customFont'>with our store!</h3>
                        </div>
                    </div>
                    <Hero1 />
                    <OverlayHome />
                    <div className='py-5 bg-mass-circles'>
                        <h1 className="text-center my-0 customFont text-warning">Contact Us!</h1>
                        <Newsletter />
                    </div>
                    <div className='pt-5'>
                        <h1 className="customFont text-warning text-center my-0 mx-auto">WE HAVE YOUR TEAM</h1>
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
                    </div> <br /> <br />
                    <Hero2 />
                    <Hero0 />
                </div >
            </div>
            <Footer />
        </>
    )
}

export default Home
