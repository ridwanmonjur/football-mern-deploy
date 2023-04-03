import React from 'react'
import "./OverlayHome.css"
import { MDBCol, MDBRow } from 'mdbreact'
import { Link } from 'react-router-dom'
import BootsImg from "../../assets/Boots.jpg"
import JerseyImg from "../../assets/Jerseys.jpg"
import AccessoriesImg from "../../assets/Accessories.jpg"

function Overlay({imgSrc, alt, children}) {
    const myStyle={
        backgroundImage: `url(${imgSrc})`
    }
    return (
        <div className="d-flex flex-wrap justify-content-center align-content-center overlay-category-div px-0" style={myStyle}>
            {/* <img src={imgSrc} alt={alt} className="overlay-image"/> */}
            <div className="justify-content-center  text-white text-center font-weight-bold overlay-category-text px-0">
                {children}
            </div>
        </div>
    )
}

function OverlayHome() {
   
    return (
        <div className='carousel-wrapper py-5'>
        <h1 className="text-center mb-3 customFont text-warning">Categories</h1>
        <MDBRow className='px-0'>
            <MDBCol lg="4" className="px-0">
                <Link to="/products/jerseys">
                    <Overlay imgSrc={JerseyImg} alt="jerseys" >
                        <h5 className='text-uppercase font-weight-bold'>Jerseys</h5>
                    </Overlay>
                </Link>
            </MDBCol>

            <MDBCol lg="4" className="px-0">
                <Link to="/products/boots">
                    <Overlay imgSrc={BootsImg} alt="boots" >
                        <h5 className='text-uppercase font-weight-bold'>Boots</h5>
                    </Overlay>
                </Link>
            </MDBCol>

            <MDBCol lg="4" className="px-0">
                <Link to="/products/accessories">
                    <Overlay imgSrc={AccessoriesImg} alt="accessories" >
                        <h5 className='text-uppercase font-weight-bold'>Accessories</h5>
                    </Overlay>
                </Link>
            </MDBCol>
        </MDBRow>
    </div>
    )
}

export default OverlayHome
