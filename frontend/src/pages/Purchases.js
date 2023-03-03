/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import React, { useState, useEffect } from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBContainer, MDBCol } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css"
import { GetAllCarts } from "../api/cart";
import Cart from "./Cart";
import { toast } from "react-toastify";
import Spinner from "../components/notifications/spinner";
import Empty from "../components/notifications/empty";
import Error from "../components/notifications/error";
import { selectIsSignedIn } from "../redux/slices/ProfileSlice";
import { returnDateFormatted } from "../components/cart/returnDateFormatted";
import { deepCopyObj } from "../helper/deepCopy";

export default function Purchases() {
  let isSignedIn = useSelector(selectIsSignedIn)
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false)
  useEffect(() => {
    async function fetchData() {
      const response = await GetAllCarts()
      setLoading(true)
      if (response.success === true && response.cart !== undefined) {
        setLoading(false)
        setData(deepCopyObj(response.cart))
      }
      else {
        throw Error("Failed to fetch the data!")
      }
    }

    let controller = new AbortController();
    if (isSignedIn) fetchData().catch((error) => {
      toast.error(error.message)
      setLoading(false)
      setError(true)
    })
    return () =>
      controller?.abort();
  }, [data.length, isSignedIn])

  return <>
    <MDBContainer fluid>
      <MDBRow className="my-4 special-margin" center>
        <MDBCol size="10">
          <MDBCard classNmae="w-100" style={{ marginTop: "45px", boxShadow: "none !important", borderWidth: "0 !important" }} shadow="0">
            <MDBCardBody className="w-100">
              <h3 className="w-100 text-warning my-4 text-center"> Purchases </h3>
              {!isSignedIn ?
                <Empty /> : (
                  <>
                    {loading && <Spinner />}
                    {error && <Error />}
                    {data.map((value, index) => {
                      if (value.status === 'active' && data.length === 1) return (
                        <Empty />
                      )
                      if (value.status === 'active') return null
                      return (
                        <div key={value._id}>
                          <div className="text-center">
                          </div>
                          <Cart key={`${value}${index}history`} data={value} isPartOfPurchaseView={true} />
                        </div>
                      )
                    })}
                  </>
                )
              }

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </>
}