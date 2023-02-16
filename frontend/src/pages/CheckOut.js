import React, { useState, useEffect } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBTabPane, MDBNav, MDBIcon } from "mdbreact";
import "./CheckOut.css";
import { useSelector, useDispatch } from "react-redux";
import { selectProfileDetails, fetchProfile, editProfile } from "../redux/slices/ProfileSlice";
import { useHistory } from "react-router";
import { api } from "../api/api";

function CheckOut() {

    let user = useSelector(selectProfileDetails)
    let history = useHistory()
    const dispatch = useDispatch()

    {/* Form values handler */ }

    // initial value
    let [input, setInput] = useState({
        addressFirst: "",
        addressSecond: "",
        creditCardCVV: "",
        creditCardNumber: "",
        changed: false
    })

    // change value
    let onChange = async (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.id;
        console.log(input)
        if (input.changed) {
            setInput({
                ...input,
                [name]: value
            });
        } else {
            setInput({
                ...input,
                changed: true,
                [name]: value
            });
        }
    }


    let updateAddressCard = async () => {
        if (user.totalPurchase > 0) {
            if (input.changed) {
                await dispatch(editProfile({ body: { addressFirst: input.addressFirst, addressSecond: input.addressSecond, creditCardNumber: input.creditCardNumber, creditCardCVV: input.creditCardCVV } }))
            }
            const response = await api('POST', 'cart', {
                mode: 'cors'
            })
            console.log({ response })
            history.replace("/purchases")
        }
        else {
            alert("First add a credit card.")
        }
    }


    useEffect(() => {
        let controller = new AbortController();
        async function fetchData() {
            try {
                await dispatch(fetchProfile())
                setInput({
                    addressFirst: user.addressFirst,
                    addressSecond: user.addressSecond,
                    creditCardCVV: user.creditCardCVV,
                    creditCardNumber: user.creditCardNumber
                })
            } catch (rejectedValueOrSerializedError) {
                console.log({ failed: rejectedValueOrSerializedError })
            }
        }

        try {
            fetchData()
        } catch (rejectedValueOrSerializedError) {
            console.log({ failed: rejectedValueOrSerializedError })
        }
        return () => {
            controller?.abort();

        }
    }, [user.creditCardNumber])

    return (
        <MDBContainer className="mb-5">
            <MDBRow className="my-2" center>
                <MDBCard className="w-100">
                    <MDBCardBody>
                        <MDBRow>

                            <MDBCol md="6" className="my-0">

                                <div>
                                    <MDBNav pills className="amber-text nav-justified">
                                        <h3>
                                            Address of delivery
                                        </h3>
                                    </MDBNav>
                                    <div >
                                        <label htmlFor="addressFirst" className="my-2">Street Address</label>
                                        <input type="text" id="addressFirst" className="form-control" onChange={(event) => onChange(event)} value={input.addressFirst} />
                                        <label htmlFor="addressSecond" className="my-2">City, Address</label>
                                        <input type="text" id="addressSecond" className="form-control" onChange={(event) => onChange(event)} value={input.addressSecond} />
                                    </div>
                                </div>
                                <MDBNav pills className="nav-justified amber-text mt-3">
                                    <h3>
                                        Credit Card
                                    </h3>
                                </MDBNav>

                                <div>
                                    <div className="d-flex justify-content-around mb-3">
                                        <div className="w-50">
                                            <label htmlFor="cc-number123">Credit card number</label>
                                            <input type="text" className="form-control" id="creditCardNumber" onChange={(event) => onChange(event)} value={input.creditCardNumber} required />
                                        </div>
                                        <div className="w-50">
                                            <label htmlFor="cc-cvv123">CVV</label>
                                            <input type="text" className="form-control" id="creditCardCVV" onChange={(event) => onChange(event)} value={input.creditCardCVV} required />

                                        </div>
                                    </div>

                                    <div className="invalid-feedback">
                                        Credit card number is required
                                    </div>

                                </div>
                                <MDBBtn color="amber lighten-4" outline size="small" onClick={updateAddressCard} >
                                    Purchase Items
                                </MDBBtn>
                            </MDBCol>

                            <MDBCol lg="6" className="my-4">

                                <MDBCard>
                                    <MDBCardBody>
                                        
                                        <h4 className="my-1 text-center text-warning">Summary</h4>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="8">
                                                Total Purchases
                                            </MDBCol>
                                            <MDBCol sm="4">
                                                £ {user.totalPurchase}
                                            </MDBCol>
                                            <hr />
                                            <MDBCol sm="8">
                                                Delivery costs
                                            </MDBCol>
                                            <MDBCol sm="4">
                                                £ {50.00}
                                            </MDBCol>
                                            <hr />

                                            <MDBCol sm="8">
                                                <strong>Total</strong>
                                            </MDBCol>
                                            <MDBCol sm="4">
                                                <strong> £ {user.totalPurchase + 50.00}</strong>
                                            </MDBCol>
                                        </MDBRow>
                                        <br />
                                        <p className="text-amber lighten-1 mb-0"><i className="fas fa-info-circle mr-1"></i> Do not delay the purchase, adding
                                            items to your cart does not mean booking them.</p>
                                    </MDBCardBody>

                                </MDBCard>

                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBRow >
        </MDBContainer >
    );

}

export default CheckOut;