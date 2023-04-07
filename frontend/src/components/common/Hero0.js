import React from 'react'
import './Hero.css'

function Hero0() {

    const section = {
        h1: "Play hard, work hard!",
        h5: "Enjoy soccer! Play it everyday for a fit body and mind. Mental health is important....",
        elems: [{
            icon: "far fa-futbol",
            h5: "Most beloved game",
            p: "The game will never let you down! Enjoy the game."
        },
        {
            icon: "fab fa-google-play",
            h5: "Play hard",
            p: "Work hard, play hard. Whatever makes you happy."
        },
        {
            icon: "fas fa-wave-square",
            h5: "Soccer shop",
            p: "Don't stop! Life will challenge you. Ace them..."
        }]
    }

    return (
        <div className='w-100 text-center py-5'>
            <h1 className="customFont text-warning text-center mt-4 mb-4 mx-auto">{section.h1}</h1>
            <h5 className="mt-4 mb-2 mx-auto">{section.h5}</h5>
            <div className='w-65vwmd-50vwlg mx-auto'>
                <div className='row'>
                    {
                        section.elems.map((elem) => (
                            <div className='col-12 col-lg-4 mb-3'>
                                <div className='bg-white d-inline-flex justify-content-center flex-column py-2 px-2 mx-auto shadow rounded-circle mb-2'>
                                    <i className={`${elem.icon} text-warning font-xl`}></i>
                                </div>

                                <div>
                                    <h5 className='mb-2'>{elem.h5}</h5>
                                    <p className='mb-2'>{elem.p}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Hero0
