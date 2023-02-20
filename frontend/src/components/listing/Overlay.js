import React from 'react'
import "./Overlay.css"


function Overlay({imgSrc, alt, children}) {
    const myStyle={
        backgroundImage: `url(${imgSrc})`
    }
    return (
        <div className="d-flex flex-wrap justify-content-center align-content-center my-4 overlay-div px-0" style={myStyle}>
            {/* <img src={imgSrc} alt={alt} className="overlay-image"/> */}
            <div className="align-self-center text-white text-center font-weight-bold overlay-text px-0">
                {children}
            </div>
        </div>
    )
}

export default Overlay
