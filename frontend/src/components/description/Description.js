import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdbreact";
import "./Description.css"
import { useDispatch } from 'react-redux';
import { addProduct } from "../../redux/slices/CartSlice";
import { cookieKey, hostNameWithoutAPI } from '../../api/env';
import { getCookie } from '../../api/api';
import { Breadcrumb } from './Breadcrumb';
import { generateProductAd } from './generateProductAd';
import { toast } from 'react-toastify';
import { CommentSection } from './Comment';

export function Description({ data }) {

    const { userId } = useParams();
    let [cartStateToReducer, setCartStateToReducer] = useState({
        rate: 0,
        size: "SM",
        quantity: 1
    })

    let handleInputChange = (event) => {
        const target = event.target;
        let value = target.value;
        value = (Object.is(parseInt(value), NaN)) ? value : parseInt(value);
        const name = target.name;
        if (name === "quantity" && (value === null || value === undefined)) {
            return;
        }
        else if (name === "quantity" && value < 0) {
            toast.error("Value can't be less than zero")
            return;
        }
        setCartStateToReducer({
            ...cartStateToReducer,
            [name]: value
        });
    }

    const dispatch = useDispatch();

    let addToCart = async () => {
        let size = document.querySelector('select[name=size]').value
        let quantity = parseFloat(document.querySelector('input[name=quantity]').value)
        let body = { size, quantity, price: data.price }

        if (cartStateToReducer.quantity > 0) {

            const token = getCookie(cookieKey)
            if (token === "null" || token === null || token === undefined) {
                toast.error("Sign in first as customer, not seller or admin!")
                return "";
            }
            else {
                await dispatch(addProduct({ productId: userId, body }))
            }
        }
        else {
            toast.error("Quantity can't be less than zero")
        }
    }

    return (

        <Fragment>
            {data.name !== undefined &&
                < div style={{ marginTop: "-80px" }}>
                    <br />
                    <Breadcrumb type={data.type} productName={data.name} productid={data._id} />
                    <MDBContainer className="pt-0">
                        <MDBRow style={{ marginTop: 0, paddingTop: 0 }} className="pt-0">
                            <MDBCol xs="12" lg="6" className="col-xs-12-imageWraper" >
                                <img src={hostNameWithoutAPI+ data?.image} alt={`${data.name}`}
                                    className="description-img frame"
                                />
                            </MDBCol>
                            <MDBCol xs="12" lg="6" mb={0}>
                                <div className="special-font font-weight-bold mq-center">
                                    <h5 className="font-weight-bold ">
                                        {data?.name}
                                    </h5>
                                    <h5 className="font-weight-bold ">
                                        £ {data?.price}
                                    </h5>
                                    <a href={`/profile/${data?.seller?._id}`} className='text-danger'><p>{data?.seller?.name}</p></a>
                                    {/* <p>{data?.seller?.email}</p> */}
                                </div>
                                <hr /> 
                                <div className="special-font">
                                    <p> Premium quality {data.type} <br/> {data.description}</p>
                                    <br />
                                    <p className="text"> Please cross-check your size with the size chart to ensure a good fit. <br /> </p>
                                </div>
                                <br />
                                <table className='w-50'>
                                    <tbody className='w-50'>
                                        <tr className="mb-4">
                                            <td className="text-left ml-0 px-0 font-weight-bold"> SIZE </td>
                                            <td>
                                                {data.type !== "accessories" &&
                                                    <select className="form-control text-center w-100px" onChange={(evt) => { handleInputChange(evt) }} name="size">
                                                        <option className='text-left'>SM</option>
                                                        <option className='text-left'>L</option>
                                                        <option className='text-left'>XL</option>
                                                        <option className='text-left'>XXL</option>
                                                    </select>
                                                }
                                                {data.type === "accessories" &&
                                                    <select className="form-control text-center w-100px" onChange={(evt) => { handleInputChange(evt) }} name="size">
                                                        <option className='text-left'>Standard</option>
                                                    </select>
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-left ml-0 px-0 font-weight-bold"> QUANTITY </td>
                                            <td>
                                                <input type="number" name="quantity" value={cartStateToReducer.quantity} className="w-100px form-control text-center" onChange={(evt) => { handleInputChange(evt) }} />,
                                            </td>
                                        </tr>
                                    </tbody>
                                    <br />

                                </table>
                                    <MDBBtn outline color="amber" className="mx-auto" onClick={addToCart}>ADD TO CART</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <CommentSection />

                </div>
            }
        </Fragment>
    )
}
