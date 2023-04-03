import React from 'react'
import Hero1Img from "../../assets/hero-1.webp"
import Hero2Img from "../../assets/hero-2.webp"
import Hero3Img from "../../assets/hero-3.webp"
import { useHistory } from 'react-router-dom'
import './Hero.css'
function Hero1() {
    const history = useHistory()

    return (
        <div className='w-100 text-center bg-mass-circles py-5'>
            <div className='w-50s mx-auto'>
                <div className='row'>
                    <div className='col-xl-6 d-flex order-fix-mobile flex-column justify-content-center text-center'>
                        <h1 className='text-warning customFont my-2'> Welcome </h1>
                        <h4 className='mb-2'> Welcome to Global Football Store </h4>
                        <h5>Ours is a 1 in a 1000 Football store, serving all the needs of customers 24/7</h5>
                        <button onClick={() => {
                            history.push("/products/jerseys");
                        }} className='btn d-block font-weight-bold font-larger mx-auto btn-sm btn-outline-warning mb-5'>
                            Shop
                        </button>
                    </div>
                    <div className='col-xl-6'>
                        <img src={Hero1Img} className='w-75 mx-auto image-hero rounded-circle' alt="wlcome" />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xl-6'>
                        <img src={Hero2Img} className='w-75 mx-auto image-hero rounded-circle' alt="ecommerce" />
                    </div>
                    <div className='col-xl-6 d-flex flex-column justify-content-center text-center'>
                        <h1 className='text-warning customFont my-2'> Stylish Fashion </h1>
                        <h4 className='mb-2'> Enjoy the best fashion trends </h4>
                        <h5>Ours is a 1 in a 1000 Football store, serving all the needs of customers 24/7</h5>
                        <button onClick={() => {
                            history.push("/products/boots");
                        }} className='btn d-block font-weight-bold btn-sm font-larger mx-auto btn-outline-warning mb-5'>
                            Shop
                        </button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xl-6 d-flex order-fix-mobile flex-column justify-content-center'>
                        <h1 className='text-warning customFont my-2'> Early bird </h1>
                        <h4 className='mb-2'> First come, first serve </h4>
                        <h5>First come, first serve store, serving all the needs of customers 24/7</h5>
                        <button onClick={() => {
                            history.push("/products/accessories");
                        }} className='btn d-block font-weight-bold font-larger mx-auto btn-sm btn-outline-warning mb-5'>
                            Shop
                        </button>
                    </div>
                    <div className='col-xl-6'>
                        <img src={Hero3Img} className='w-75 mx-auto image-hero rounded-circle' alt="ecommerce" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero1
