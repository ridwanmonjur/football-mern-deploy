/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState }
    from "react";
import {
    MDBContainer, MDBCol, MDBRow, MDBCard, MDBNav, 
    MDBIcon,
    MDBAlert
} from "mdbreact";
import "./SignIn.css"
import { useSelector, useDispatch } from "react-redux";
import { selectProfileDetails, fetchProfile, editProfile, selectIsSignedIn } from "../redux/slices/ProfileSlice";

function Profile() {
    let [user, setUser] = useState(useSelector(selectProfileDetails))
    let isSignedIn = useState(useSelector(selectIsSignedIn))

    const dispatch = useDispatch()
    let toggleCollapse1 = (collapseID) => () => {
        let collapse = document.getElementById(collapseID);
        collapse.classList.toggle("d-none");
    }

    {/* Form values handler */ }

    // initial value
    let [input, setInput] = useState({
        addressFirst: "",
        addressSecond: "",
        creditCardCVV: "",
        creditCardNumber: ""
    })

    // change value
    let onChange = async (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.id;
        console.log(input)
        setInput({
            ...input,
            [name]: value
        });
    }


    let updateAddress = async () => {
        let result= await dispatch(editProfile({ body: { addressFirst: input.addressFirst, addressSecond: input.addressSecond } })).unwrap()
        console.log({result})
        // wil reset
        setUser({
            ...user,
            addressFirst: input.addressFirst, addressSecond: input.addressSecond
        })
    }
    let updateCard = async () => {
        let result= await dispatch(editProfile({ body: { creditCardNumber: input.creditCardNumber, creditCardCVV: input.creditCardCVV } }))
        console.log({result})
        // wil reset
        setUser({
            ...user,
            creditCardNumber: input.creditCardNumber, creditCardCVV: input.creditCardCVV
        })
    }
    useEffect(() => {
        let controller = new AbortController();
        async function fetchData() {

            await dispatch(fetchProfile())
            setInput({
                addressFirst: (user.addressFirst === undefined) ? "" : user.addressFirst,
                addressSecond: (user.addressSecond === undefined) ? "" : user.addressSecond,
                creditCardCVV: (user.creditCardCVV === undefined) ? "" : user.creditCardCVV,
                creditCardNumber: (user.creditCardNumber === undefined) ? "" : user.creditCardNumber
            })

        }

        try {
            fetchData()
        } catch (rejectedValueOrSerializedError) {
            console.log({ failed: rejectedValueOrSerializedError })
        }
        return () => {
            controller?.abort();

        }
    }, [user.creditCardNumber, isSignedIn])

    return (
        <MDBContainer>
            <div className="scaffold mx-auto">
                <MDBRow center>
                    <MDBCard className="mx-auto real-profile-container">
                        {/* <MDBCardBody> */}
                        <form style={{ fontSize: "16px" }}>
                            {/* <MDBTabPane> */}

                            <MDBRow style={{ marginBottom: "0px", marginTop: "0px !important", fontSize: "16px" }}>
                                <MDBNav pills className="mx-auto amber-text my-0 prepostTitle d-flex flex-column justify-content-center">
                                    <h2> PERSONAL DETAILS</h2>
                                </MDBNav>
                                <MDBCol md="12" className="my-0">
                                    <label htmlFor="name" className="my-2">Name</label>
                                    <input type="text" id="name" value={user.name} className="form-control" />
                                    <label htmlFor="role" className="my-2">Role</label>
                                    <input type="text" id="role" value={String(user.role)} className="form-control" />
                                    <label htmlFor="email" className="my-2">Email address</label>
                                    <input type="text" id="email" className="form-control" value={user.email} placeholder="youremail@example.com" />
                                </MDBCol>

                            </MDBRow>

                            <MDBRow style={{ marginBottom: "0px !important", margnTop: "0px !important" }}>

                                <MDBCol md="12">
                                    <div>
                                        <MDBNav pills className="amber-text nav-justified">
                                            <h3>
                                                <span>Address</span>
                                                <  MDBIcon icon="angle-down"
                                                    size="sm"
                                                    className="ml-4"
                                                    onClick={toggleCollapse1("basicCollapse1")}
                                                />
                                                <  MDBIcon icon="save"
                                                    size="sm"
                                                    className="ml-4"
                                                    onClick={updateAddress}
                                                />
                                            </h3>
                                        </MDBNav>
                                        <div id="basicCollapse1" className="d-none">

                                            {user.addressFirst === undefined && user.addressSecond === undefined &&
                                                <>
                                                    <MDBAlert color="info" dismiss>
                                                        Address is required! Please add.
                                                    </MDBAlert>
                                                    <label htmlFor="addressFirst" className="my-2">Street Address</label>
                                                    <input type="text" id="addressFirst" className="form-control" onChange={(event) => onChange(event)} value={input.addressFirst} />
                                                    <label htmlFor="addressSecond" className="my-2">City, Address</label>
                                                    <input type="text" id="addressSecond" className="form-control" onChange={(event) => onChange(event)} value={input.addressSecond} />
                                                </>
                                            }
                                            {user.addressFirst !== undefined && user.addressSecond !== undefined &&
                                                <>
                                                    <label htmlFor="addressFirst" className="my-2">Street Address</label>
                                                    <input type="text" id="addressFirst" className="form-control" onChange={(event) => onChange(event)} value={input.addressFirst} placeholder={"Haven't added address yet!"} />
                                                    <label htmlFor="addressSecond" className="my-2">City, Address</label>
                                                    <input type="text" id="addressSecond" className="form-control" onChange={(event) => onChange(event)} value={input.addressSecond} placeholder={"Add your address."} />
                                                </>
                                            }

                                        </div>
                                    </div>

                                </MDBCol>
                            </MDBRow>

                            <MDBRow style={{ marginBottom: "0px !important", margnTop: "0px !important" }}>
                                <MDBCol md="12">
                                    <MDBNav pills className="nav-justified amber-text">
                                        <h3>
                                            <span>Billing</span>
                                            <MDBIcon icon="angle-down ml-3" size="sm"
                                                onClick={toggleCollapse1("basicCollapse2")}
                                            />
                                            <  MDBIcon icon="save"
                                                size="sm"
                                                className="ml-4"
                                                onClick={updateCard}
                                            />
                                        </h3>
                                    </MDBNav>
                                    <div id="basicCollapse2" className="d-none">

                                        <div className="my-3">

                                            {user.creditCardNumber === undefined && user.creditCardCVV === undefined &&
                                                <>
                                                    <MDBAlert color="info" dismiss>
                                                        Credit card is required! Please add.
                                                    </MDBAlert>
                                                    <div className="w-50">
                                                        <label htmlFor="cc-number123">Credit card number</label>
                                                        <input type="text" className="form-control" id="creditCardNumber" onChange={(event) => onChange(event)} value={input.creditCardNumber} placeholder={"Card Number"} required />
                                                    </div>
                                                    <div className="w-50">
                                                        <label htmlFor="cc-cvv123">CVV</label>
                                                        <input type="text" className="form-control" id="creditCardCVV" onChange={(event) => onChange(event)} value={input.creditCVV} placeholder={"Card CVV"} required />
                                                    </div>
                                                </>

                                            }

                                            {user.creditCardNumber !== undefined && user.creditCardCVV !== undefined &&
                                                <>
                                                    <label htmlFor="cc-name123">Name on card</label>
                                                    <input type="text" className="form-control" id="cc-name123" value={user.name} onChange={()=>{}} required />
                                                    <br />
                                                    <small className="text-muted">Full name as displayed on card</small>
                                                    <br />
                                                    <div className="invalid-feedback">
                                                        Name on card is required
                                                    </div>
                                                    <div className="w-50">
                                                        <label htmlFor="cc-number123">Credit card number</label>
                                                        <input type="text" className="form-control" id="creditCardNumber" onChange={(event) => onChange(event)} value={input.creditCardNumber} required />
                                                    </div>
                                                    <div className="w-50">
                                                        <label htmlFor="cc-cvv123">CVV</label>
                                                        <input type="text" className="form-control" id="creditCardCVV" onChange={(event) => onChange(event)} value={input.creditCardCVV} required />
                                                    </div>
                                                </>
                                            }
                                        </div>

                                    </div>
                                </MDBCol>
                            </MDBRow>



                            {/* </MDBTabPane> */}
                        </form>

                        {/* </MDBCardBody> */}
                    </MDBCard>
                </MDBRow >
            </div>
        </MDBContainer >
    );

}

export default Profile;