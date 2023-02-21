/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import React, { useState, useEffect } from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBContainer, MDBCol } from "mdbreact";
import { useDispatch } from "react-redux";
import "./Cart.css"
import { GetAllCarts } from "../api/cart";
import Cart from "./Cart";
import { toast } from "react-toastify";
import Spinner from "../components/notifications/spinner";
import Empty from "../components/notifications/empty";
import Error from "../components/notifications/error";


function returnDateFormatted(dateString) {
  var dateObj = new Date(dateString)
  console.log({ dateString, dateObj })
  var hour = dateObj.getHours();
  var minutes = dateObj.getMinutes();
  var seconds = dateObj.getSeconds();

  var day = dateObj.getDate();
  var year = dateObj.getYear();
  var month = dateObj.getMonth();

  return `Purchased at ${day}/${month}/${year} ${hour}:${minutes}:${seconds}`
}

export function deepCopyObj(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  if (obj instanceof Date) {
    var copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  if (obj instanceof Array) {
    var copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopyObj(obj[i]);
    }
    return copy;
  }
  if (obj instanceof Object) {
    var copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopyObj(obj[attr]);
    }
    return copy;
  }
  throw new Error("Unable to copy obj this object.");
}
export default function Purchases() {

  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false)
  useEffect(() => {
    async function fetchData() {
      const response = await GetAllCarts()
      if (response.cart !== undefined) {
        await setLoading(false)
        setData(deepCopyObj(response.cart))
      }
      else {
        throw Error("Failed to fetch the data!")
      }
    }

    let controller = new AbortController();
    try {
      fetchData()
    } catch (error) {
      toast.error(error)
      setError(true)
    }
    return () =>
      controller?.abort();
  }, [data.length])

  return <>
    <MDBContainer fluid>
      <MDBRow className="my-4 special-margin" center>
        <MDBCol size="10">
          <MDBCard classNmae="w-100" style={{ marginTop: "45px", boxShadow: "none !important", borderWidth: "0 !important" }} shadow="0">
            <MDBCardBody className="w-100">
              <h3 className="w-100 text-warning my-4 text-center"> Purchases </h3>
              {loading && <Spinner />}
              {error && <Error />}
              {data.map((value, index) => {
                if (value.status === 'active' && data.length === 1) return (
                  <Empty />
                )
                if (value.status === 'active') return null
                return (
                  <>
                    {value.paidAt && <p className="my-2 text-center"> {returnDateFormatted(value.paidAt)} </p>}
                    <Cart key={`${value}${index}history`} data={value} isPartOfPurchaseView={true} />
                  </>
                )
              })}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </>
}