import React, { useState, Fragment } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBTooltip } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import "./GridVertical.css"
import { hostNameWithoutAPI } from '../../api/env';
// JS for loop doesnt work inside html

function GridVertical({ productName, data }) {
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
            <div>
                <h1 className="text-center text-uppercase font-weight-bolder text-warning mb-5 pb-3 customFont heading"> Our {productName} </h1>
                <div className="loadGrid__gridItems">
                    {
                        data !== null &&
                        data.map((value, index) => {
                            if (index < begin || index >= length + begin) return null
                            else return (
                                <Fragment key={`${index}${value._id}`}>
                                    <MDBCard className="px-0 mx-0" style={{ border: "1px solid gold" }}>

                                        <NavLink to={`/products/${productName}/${value._id}`} className="image-hyperlink">
                                            <MDBCardImage className="card-image" src={`${hostNameWithoutAPI}assets/${productName}/image${index}.jpg`} alt={`image${index}`} waves />

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
                <div className="divBtnOutline text-center py-5">
                    <MDBBtn
                        onClick={
                            () => increment(-1)
                        }
                    > Prev </MDBBtn>
                    {
                        arr.map((value) => {
                            return (
                                <MDBBtn key={`${value}button`} onClick={() => {
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
                        onClick={
                            () => increment(1)
                        }> Next </MDBBtn>
                </div>
            </div>
        </Fragment>
    )
}

export default GridVertical
