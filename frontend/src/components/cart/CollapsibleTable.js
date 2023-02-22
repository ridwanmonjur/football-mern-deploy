import { MDBCollapse, MDBIcon } from "mdbreact"
import { Fragment } from 'react'
export function CustomCollpsibleTable({ data, deleteCart, cartStatus, rows, toggleCollapse, collapse }) {
    return (
        <>
            {/* Table */}
            <div className="px-3">
                <div className="d-grid d-lg-none w-80 border border-warning py-2"
                    style={{
                        display: "grid ", gridTemplateColumns: "0.5fr 1fr 3fr 1fr", justifyContent: "center",
                        alignItems: "center", background: "#FFF8E1"

                    }}
                >
                    <span
                    >
                    </span>
                    <span>
                        Image
                    </span>
                    <span>
                        Name
                    </span>
                    <div
                        className="mx-auto"
                    >
                    </div>
                </div>
                {
                    cartStatus === "success" &&
                    data.products &&
                    data.products[0] !== null &&
                    rows.map((val, index) => {

                        return (
                            <Fragment key={`${val}${index}}`} >
                                <div onClick={toggleCollapse(index)} className="d-grid d-lg-none w-80 border-top border-bottom border-warning py-2"
                                    style={{
                                        display: "grid ", gridTemplateColumns: "0.5fr 1fr 3fr 1fr", justifyContent: "center",
                                        alignItems: "center"

                                    }}
                                >
                                    <span
                                    >
                                        <  MDBIcon icon="angle-down" />
                                    </span>
                                    <span>
                                        {val.imageSrc}
                                        {/* <img src={`${val.imageSrc}`} alt={val.name} /> */}
                                    </span>
                                    <span>
                                        {val.name}

                                    </span>
                                    <div
                                        className="mx-auto"
                                    >
                                        <MDBIcon far icon="times-circle" onClick={() => { deleteCart(index) }} />
                                    </div>
                                </div>
                                <MDBCollapse id="basicCollapse" isOpen={collapse[index]} className="py-3 align-items-around" style={{ height: "130px" }}>
                                    <div className="pl-5 ml-5">
                                        <strong> Size: {val.size} </strong>
                                        <br />
                                        <strong> Price: {val.price} </strong>
                                        <br />
                                        <strong> Quantity {val.quantity} </strong>
                                        <br />
                                        <strong> {val.amount}</strong>
                                    </div>
                                </MDBCollapse>
                            </Fragment>
                        )
                    }
                    )
                }
            </div>
        </>
    )
}