/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBTooltip } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import "./GridHorizontal.css"

function GridHorizontal({ product, data, numberOfItems, headingTrue }) {

    let [jsonData, setJsonData] = useState([
    ]);
    useEffect( () => {
        setJsonData(data[3], data[6], data[9], data[12])
    }, [data.length])
    // jsonData is updated in useEffect, so if you keep jsonData in dependency array, useEffect will be implementeda
    // again and again
    // so if you keep begin in dependency array, they are updated outside useEffect
    // so no continuous re-render
    return (
        <Fragment>
            <div className="text-center position-relative outerRow">
                {headingTrue && <h1 className="text-center text-uppercase font-weight-bolder text-warning my-5 py-3 my-5"> Best Value {product} </h1>}
                <div className="loadRow__Items">
                    {
                        jsonData !== null &&
                        data[0].hasOwnProperty('value')== undefined &&
                        jsonData.map((value, index) => {
                            if (index > numberOfItems - 1) return null
                            return (
                                <Fragment key={index}>
                                    <MDBCard style={{ borderRadius: "10px !important", border: "0.5px solid gold", boxShadow: "0px 0px 5x 0px lightyellow" }} >
                                        <NavLink to={`/${value.type}/${value._id}`}>
                                            <MDBCardImage className="img-fluid rowImg" src={`/assets/${product}/image${index}.jpg`} alt={`image${index}`} waves />
                                            <MDBCardBody className="rowBody py-0">
                                                <MDBCardTitle className="rowTitle">
                                                    <MDBTooltip
                                                        domElement tag="span"
                                                        placement="top"
                                                    >
                                                        <p className="title-info-1"> {value.name} </p>
                                                        <span> {value.name} </span>
                                                    </MDBTooltip>
                                                </MDBCardTitle>
                                                <p className="title-info-1">{value.price}</p>
                                            </MDBCardBody>
                                        </NavLink>
                                    </MDBCard>
                                </Fragment>
                            )
                        })
                    }
                </div>

            </div>
        </Fragment >
    )
}

export default GridHorizontal
