/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import React, { useState, Fragment, useEffect } from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBTable, MDBTableBody, MDBTableHead, MDBCollapse, MDBIcon } from "mdbreact";
import { useDispatch } from "react-redux";
import { editProduct, deleteProduct } from "../redux/slices/CartSlice";
import { useHistory } from "react-router";
import "./Cart.css"
import { editProfile } from "../redux/slices/ProfileSlice";
import { api } from "../api/api";
import Cart from "./Cart";
import { roundOff } from "../helper/roundOff";
// name, price, imageSrc, type
// inputs: rate, size, quantity

function returnDateFormatted(dateString){
  var dateObj= new Date(dateString)
  console.log({dateString, dateObj})
  var hour = dateObj.getHours();
  var minutes = dateObj.getMinutes();
  var seconds = dateObj.getSeconds() ;

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
  const dispatch = useDispatch();
  console.log({ data })

  useEffect(() => {
    // fetch Data
    async function fetchData() {
      const response = await api('GET', `cart`, {
        mode: 'cors',
      })
      if (response.cart !== undefined){
        console.log({response})
        setData(deepCopyObj(response.cart))
      }
    }

    let controller = new AbortController();
    try {
      fetchData()
    } catch (rejectedValueOrSerializedError) {
      console.log({ failed: rejectedValueOrSerializedError })
    }
    return () => {
      controller?.abort();

    }
  }, [data.length])

  return <>
    <MDBRow className="my-0 special-margin" center>
      <MDBCard style={{ marginTop: "45px", boxShadow: "none !important", borderWidth:"0 !important" }} shadow="0">
        <MDBCardBody>
          <h3 className="w-100 text-warning my-0 text-center"> Purchases </h3>
          <br />
          {data.map((value, index) => {
            console.log({value})
            if (value.status === 'active' && data.length===1) return (
              <div style={{width: "60vw"}}>
                <p className="text-center">No purchases yet!</p>
              </div>
            )
            if (value.status === 'active') return null

            return (
              <>
                {value.paidAt && <p className="my-2 text-center"> {returnDateFormatted(value.paidAt)} </p> }
                <Cart key={`${value}${index}history`} data={value} isPartOfPurchaseView={true} />
              </>
            )
          })}
        </MDBCardBody>
      </MDBCard>
    </MDBRow>
  </>
}