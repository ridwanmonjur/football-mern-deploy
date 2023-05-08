import React, { useState, Fragment } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBTooltip } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import "./GridVertical.css"
import { hostNameWithoutAPI } from '../../api/env';
// JS for loop doesnt work inside html
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

function GridVertical({ productName, data, scrollPosition }) {
    let [begin, setBegin] = useState(0);
    let length = 16;
    let dataLength = data.length;
    let increment = (multiplier) => {
        setBegin((prev) => {
            let prev2 = prev
            prev2 = prev2 + (length * parseInt(multiplier))
            if (prev2 < 0) {
                prev2 = 0;
            }
            if (prev2 >= dataLength) {
                prev2 = dataLength - length;
            }
            return prev2;
        });
    }
    /// Pagination
    let num = Math.ceil(parseInt(dataLength) / parseInt(length));
    let arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(i)
    }
    // console.log({updated: true, begin, productName})

    return (
        <Fragment>
            <div className='mt-n4'>
                <h1 className="text-center text-uppercase font-weight-bolder text-warning customFont mb-4"> Our {productName} </h1>
                <div className="loadGrid__gridItems">
                    {
                        data !== null &&
                        data.map(( value , index) => {
                            if (index < begin || index >= length + begin) return null
                            else return (
                                <Fragment key={`${index}${value._id}`}>
                                    <MDBCard className="px-0 mx-0" style={{ border: "1px solid gold" }}>

                                        <NavLink to={`/products/${productName}/${value._id}`} className="image-hyperlink text-center">
                                            <LazyLoadImage
                                                scrollPosition={scrollPosition}
                                                placeholder={
                                                    <img src="../../assets/Adidas.png" width={300} height={300} alt="lazy" />
                                                }
                                                className="card-image" src={`${hostNameWithoutAPI}assets/${productName}/image${index}.jpg`} alt={`${index}`} waves="true" />

                                            <MDBCardBody className="d-flex flex-column justify-content-center align-items-center">
                                                <MDBCardTitle >
                                                    <MDBTooltip
                                                        domElement tag="span"
                                                        placement="top"
                                                    >
                                                        <p className="card-text-custom text"> {value.name} </p>
                                                        <span> {value.name} </span>
                                                    </MDBTooltip>
                                                </MDBCardTitle>
                                                <p className="card-text-custom text-bold">
                                                    £ {value.price}
                                                </p>
                                            </MDBCardBody>
                                        </NavLink>
                                    </MDBCard>
                                </Fragment>
                            )
                        })
                    }
                </div>
                <div className="divBtnOutline text-center pt-3  pb-5 mt-2">
                    <MDBBtn
                        className='btn btn-sm font-larger text-white'
                        onClick={
                            () => increment(-1)
                        }
                    > Prev </MDBBtn>
                    {
                        arr.map((value) => {
                            return (
                                <MDBBtn key={`${value}button`} className='btn btn-sm text-white font-weight-bold font-larger' onClick={() => {
                                    setBegin(length * value)
                                }
                                }>
                                    {value + 1}
                                </MDBBtn>
                            )
                        }
                        )
                    }
                    <MDBBtn
                        className='btn btn-sm font-larger text-white'
                        onClick={
                            () => increment(1)
                        }> Next </MDBBtn>
                </div>
            </div>
        </Fragment>
    )
}

export default trackWindowScroll(GridVertical)
