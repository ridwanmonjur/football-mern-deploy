import React from 'react'
import HeroImg from "../../assets/mobile-main-big-screen.jpg"

function Hero0() {
    const section = {
        hero: HeroImg,
        elem1: [{
            icon: "far fa-futbol",
            h1: "Soccer shop",
            p: "The game will never let you down! Enjoy the game."
        },
        {
            icon: "far fa-futbol",
            h1: "Soccer shop",
            p: "The game will never let you down! Enjoy the game."
        },
        {
            icon: "far fa-futbol",
            h1: "Soccer shop",
            p: "The game will never let you down! Enjoy the game."
        }],
        elem2: [{
            icon: "far fa-futbol",
            h1: "Soccer shop",
            p: "The game will never let you down! Enjoy the game."
        },
        {
            icon: "far fa-futbol",
            h1: "Soccer shop",
            p: "The game will never let you down! Enjoy the game."
        },
        {
            icon: "far fa-futbol",
            h1: "Soccer shop",
            p: "The game will never let you down! Enjoy the game."
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
                                <div className='mb-3 d-flex justify-content-center align-items-center'>
                                    <div className='bg-white d-inline-flex justify-content-center flex-column py-2 px-2 mx-auto shadow rounded-circle mb-2'>
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
                    <div className='col-12 col-lg-4 mb-3 text-center'>
                        <img src={HeroImg} className='w-75 mx-auto rounded-pill' alt="hero" />
                    </div>
                    <div className='col-12 col-lg-4 d-flex flex-column justify-content-center mb-3'>
                        {
                            section.elem2.map((elem) => (
                                <div className='mb-3 d-flex justify-content-center align-items-center'>
                                    <div className='bg-white d-inline-flex justify-content-center flex-column py-2 px-2 mx-auto shadow rounded-circle mb-2'>
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
