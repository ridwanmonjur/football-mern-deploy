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

function deepCopyObj(obj) {
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

  let [data, setData] = useState([{
    products: [],
    description: [{ quantity: 0, size: "" }],
    total: 0,
    paid: false
  }]);
  const dispatch = useDispatch();
  console.log({ data })

  useEffect(() => {
    // fetch Data
    async function fetchData() {
      const response = await api('GET', `cart`, {
        mode: 'cors',
      })
      if (response.cart !== undefined)
        setData(deepCopyObj(response.cart))
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
      <MDBCard style={{ marginTop: "45px" }}>
        <MDBCardBody>
          <h3 className="w-100 text-warning my-0 text-center"> Purchases </h3>
          <br />
          {data.map((value, index) => {
            if (value.status === 'active' && data.length===1) return (
              <div style={{width: "60vw"}}>
                <p className="text-center">No purchases yet!</p>
              </div>
            )
            if (value.status === 'active') return null

            return (
              <>
                {value.paidAt && <p className="my-2 text-center"> {returnDateFormatted(value.paidAt)} </p> }
                <Cart key={`${value}${index}history`} data={value} />
              </>
            )
          })}
        </MDBCardBody>
      </MDBCard>
    </MDBRow>
  </>
}
export function Cart({ data }) {
  /*
          name, price, imageSrc, type
          inputs: rate, size, quantity
      */


  // const response = await api('GET', `cart`, {
  //   mode: 'cors',
  // })

  let [collapse, setCollapse] = useState(Array(data.length).fill(false));
  let toggleCollapse = index => () => {
    setCollapse((prev) => {
      let newCollapse = [...prev]
      newCollapse[index] = !prev[index]
      return newCollapse
    })
  }
  const dispatch = useDispatch();
  const history = useHistory();
  let columns = [
    {
      label: <strong>Image</strong>,
      field: 'imageSrc',
    },
    {
      label: <strong>Cart</strong>,
      field: 'name'
    },
    {
      label: <strong>Size</strong>,
      field: 'size'
    },
    {
      label: <strong>Price</strong>,
      field: 'price'
    },
    {
      label: <strong>Quantity</strong>,
      field: 'quantity'
    },
    {
      label: <strong>Amount</strong>,
      field: 'amount'
    },
  ]

  let total = 0;
  let rows = []
  if (data.products) {
    data.products.forEach((value, index) => {
      let totalPrice = 0
      totalPrice = parseFloat(data.description[index].quantity) * parseFloat(value.price)
      total += totalPrice
      rows.push(
        {
          'imageSrc': <img src={`/assets/${value.type}/${value.image}`} alt="" style={{ width: "50px" }} />,
          'name': <strong> £ {value.name}</strong>,
          'size': <strong> {data.description[index].size} </strong>,
          'price': <strong> {roundOff(value.price)} </strong>,
          'quantity':
            <input name="quantity" value={data.description[index].quantity} id="quantity" className="specialInput border-warning" style={{ width: "100px" }} disabled />,
          'amount': <strong> £ {totalPrice}</strong>,
        }
      )
    });
  }
  let handleInputChange = async (event, index) => {
    let quantity = parseInt(event.target.value);
    let size = data.description[index].size
    console.log({ quantity, size })
    index = parseInt(index)
    if (quantity <= 0) {
      alert("value cannot be less than zero");
    }
    else {
      let body = { size, quantity }
      let productId = data.products[index]._id
      // console.log({ size, quantity, productId })
      let returnValue = await dispatch(editProduct({ productId, index, body })).unwrap()
      console.log(returnValue)

    }
  }

  let checkOut = async (totalPurchase) => {
    if (rows.length === 0) {
      alert("Purchase an item first!");
    }
    else {
      let returnValue = await dispatch(editProfile({ body: { totalPurchase } })).unwrap()
      console.log(returnValue)
      history.replace("/checkOut")
    }
  }

  let deleteCart = (index) => {
    dispatch(deleteProduct(index))
  }

  return (
    <div className="my-3">


      {/* Table */}

      <MDBTable className="product-table d-none d-lg-table w-80">
        <MDBTableHead className="form-control font-weight-bold purchase" color="amber lighten-5 border-0 border border-warning" columns={columns} />
        <MDBTableBody rows={rows} />
      </MDBTable>

      {/* Table */}
      <div className="px-1">
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
          <span className="px-4">
            Name
          </span>
          <div
            className="mx-auto"
          >
          </div>
        </div>
        {
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
                  </span>
                  <span>
                    {val.name}

                  </span>
                  <div
                    className="mx-auto"
                  >

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
      {
        (!data.products ||
        data.products[0] === null) &&
        <div style={{ textAlign: "center" }}>
          Added nothing to cart !
        </div>

      }
      {
        data.products &&
        data.products[0] !== null &&
        <div className="pr-5">
          <div className="mt-3 d-flex justify-content-end">
            <strong>TOTAL : &nbsp;</strong>
            <strong className="ml-4">{roundOff(total)}</strong>
          </div>
        </div>
      }
    </div >
  );
}


