import React, {  Fragment } from 'react'
import {  MDBCard, MDBCardBody, MDBCardTitle, MDBTooltip } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import "./GridVertical.css"
// JS for loop doesnt work inside html
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import { hostNameWithoutAPI } from '../../api/env';

function GridVertical({ productName, data, scrollPosition }) {
   console.log({data2: data})
    return (
        <Fragment>
            <div className='mt-n4'>
                <div className="loadGrid__gridItems">
                    {
                        data != null && data?.docs !== null &&
                        data.docs?.map((value, index) => {
                            return (
                                <Fragment key={`${index}${value?._id}`}>
                                    <MDBCard className="px-0 mx-0" style={{ border: "1px solid gold" }}>

                                        <NavLink to={`/products/${productName}/${value?._id}`} className="image-hyperlink text-center">
                                            <LazyLoadImage
                                                scrollPosition={scrollPosition}
                                                placeholder={
                                                    <img src="../../assets/Adidas.png" width={300} height={300} alt="lazy" />
                                                }
                                                className="card-image" src={`${hostNameWithoutAPI}${value?.image}`} alt={`${index}`} waves="true" />

                                            <MDBCardBody className="d-flex flex-column justify-content-center align-items-center">
                                                <MDBCardTitle >
                                                    <MDBTooltip
                                                        domElement tag="span"
                                                        placement="top"
                                                    >
                                                        <p className="card-text-custom text"> {value?.name} </p>
                                                        <span> {value?.name} </span>
                                                    </MDBTooltip>
                                                </MDBCardTitle>
                                                <p className="card-text-custom text-bold">
                                                    £ {value?.price}
                                                </p>
                                                <p className="card-text-custom mt-2">
                                                    Seller: {value?.seller?.name}
                                                </p>
                                            </MDBCardBody>
                                        </NavLink>
                                    </MDBCard>
                                </Fragment>
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default trackWindowScroll(GridVertical)
