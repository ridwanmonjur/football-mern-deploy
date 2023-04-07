import React from 'react'
import HeroImg from "../../assets/mobile-main-big-screen.jpg"

function Hero0() {
    const section = {
        hero: HeroImg,
        elem1: [{
            icon: "far fa-futbol",
            h1: "Soccer store",
            p: "The game will never let you down! Enjoy the game."
        },
        {
            icon: "fab fa-google-play",
            h1: "Play hard",
            p: "Work hard, play hard. Whatever makes you happy."
        },
        {
            icon: "fas fa-wave-square",
            h1: "Soccer shop",
            p: "Don't stop! Life will challenge you. Ace them..."
        }],
        elem2: [{
            icon: "fas fa-briefcase-medical",
            h1: "Medical",
            p: "Maintain your physical health"
        },
        {
            icon: "fab fa-amazon",
            h1: "Connected",
            p: "Connected to major retailers like Amazon, Shoppee or Lazada."
        },
        {
            icon: "fas fa-truck",
            h1: "Delviery",
            p: "24/7 delivery for customers"
        }]
    }
    return (
        <div className='w-100 text-left bg-mass-circles py-5'>
            <h1 className="customFont text-warning text-center mt-4 mb-4 mx-auto">Play like your heroes!</h1>
            <div className='w-75 mx-auto'>
                <div className='row'>
                    <div className='col-12 col-lg-4 d-flex flex-column justify-content-center mb-3'>
                        {
                            section.elem1.map((elem) => (
                                <div className='mb-3 d-flex justify-content-start align-items-center'>
                                    <div className='bg-white d-inline-flex justify-content-center flex-column py-2 px-2 shadow rounded-circle mb-2'>
                                        <i className={`${elem.icon} text-warning font-xl`}></i>
                                    </div>
                                    <div>
                                        <h4 className='ml-3 mb-2 d-block'>{elem.h1}</h4>
                                        <p className='ml-3 mb-2 d-block'>{elem.p}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='col-12 col-lg-4 mb-3 text-center justify-content-center '>
                        <img src={HeroImg} className='w-50vwxs-w-75lg mx-auto rounded-pill' alt="hero" />
                    </div>
                    <div className='col-12 col-lg-4 d-flex flex-column justify-content-center mb-3'>
                        {
                            section.elem2.map((elem) => (
                                <div className='mb-3 d-flex justify-content-start align-items-center'>
                                    <div className='bg-white d-inline-flex justify-content-center flex-column py-2 px-2 shadow rounded-circle mb-2'>
                                        <i className={`${elem.icon} text-warning font-xl`}></i>
                                    </div>
                                    <div>
                                        <h4 className='ml-3 mb-2 d-block'>{elem.h1}</h4>
                                        <p className='ml-3 mb-2 d-block'>{elem.p}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero0
