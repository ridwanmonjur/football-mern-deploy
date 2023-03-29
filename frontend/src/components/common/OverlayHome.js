import React from 'react'
import "./OverlayCategory.css"


function OverlayHome({imgSrc, alt, children}) {
    const myStyle={
        backgroundImage: `url(${imgSrc})`
    }
    return (
        <div className="d-flex flex-wrap justify-content-center align-content-center mb-4 overlay-category-div px-0" style={myStyle}>
            {/* <img src={imgSrc} alt={alt} className="overlay-image"/> */}
            <div className="align-center text-white text-center font-weight-bold overlay-category-text px-0">
                {children}
            </div>
        </div>
    )
}

export default OverlayHome
