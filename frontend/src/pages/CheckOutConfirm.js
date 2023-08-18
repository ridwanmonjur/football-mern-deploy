/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBNav } from "mdbreact";
import "./CheckOut.css";
import { useSelector, useDispatch } from "react-redux";
import { selectProfileDetails,  editProfile, selectIsSignedIn } from "../redux/slices/ProfileSlice";
import { useHistory } from "react-router";
import { api } from "../api/api";
import { toast } from "react-toastify"
import { fetchCart, selectCart } from "../redux/slices/CartSlice";
import FullPageIntroWithNonFixedNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
function CheckOutConfirm() {

    let user = useSelector(selectProfileDetails)

    let history = useHistory()
    const dispatch = useDispatch()

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

    let isSignedIn = useSelector(selectIsSignedIn)

    useEffect(() => {
        async function fetchData() {
          await dispatch(fetchCart())
        }
        
        let controller = new AbortController();
        if (isSignedIn) fetchData().catch((error) => {
            toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
          })
        return () => {
          controller?.abort();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isSignedIn])

    let updateAddressCard = async () => {
        if (user?.address?.first && user?.address?.second && user?.creditCard?.number && user?.creditCard?.CVV) {
            if (input.changed) {
                await dispatch(
                    editProfile(
                        {
                            body:
                            {
                                addressFirst: input.addressFirst,
                                addressSecond: input.addressSecond,
                                creditCardNumber: input.creditCardNumber,
                                creditCardCVV: input.creditCardCVV
                            }
                        }))
            }
            await api('POST', 'cart', {
                mode: 'cors'
            })
            history.replace("/purchases")
        }
        else {
            toast.error("First add a credit card.")
        }
    }


    useEffect(() => {
    //     let controller = new AbortController();
    setInput({
        addressFirst: user?.address.first || "",
        addressSecond: user?.address.second || "",
        creditCardCVV: user?.creditCard.CVV || "",
        creditCardNumber: user?.creditCard.number || ""
    })

}, [user?.address.first, user?.address.second, user?.creditCard.CVV, user?.creditCard.number])
//     try {
//         fetchData()
//     } catch (error) {
//         toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
//     }
//     return () => {
//         controller?.abort();

//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps

return (
    <>
        <FullPageIntroWithNonFixedNavbar />
        <MDBContainer fluid style={{ minHeight: "70vh", marginTop: "150px" }}>
            {
                user?.creditCard &&
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
                                                        {/* £ {roundOff(cart?.total)} */}
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
                                                        {/* <strong> £ {roundOff(cart?.total) + 50.00}</strong> */}
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
            }
        </MDBContainer>
        <Footer />
    </>
);

}

export default CheckOutConfirm;