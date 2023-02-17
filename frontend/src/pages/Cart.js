import React, { useState, Fragment, useEffect } from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBCollapse, MDBIcon } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, editProduct, fetchCart, deleteProduct } from "../redux/slices/CartSlice";
import { useHistory } from "react-router";
import "./Cart.css"
import { editProfile } from "../redux/slices/ProfileSlice";
import { roundOff } from "../helper/roundOff";

export default function Cart() {
 
  let data = useSelector(selectCart);
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
    {
      label: <strong>Delete</strong>,
      field: 'button'
    }
  ]

  let total = 0;
  let rows = []
  if (data.products) {
    if (data.products[0] !== null) {
      data.products.forEach((value, index) => {
        let totalPrice = 0
        totalPrice = parseFloat(data.description[index].quantity) * roundOff(parseFloat(value.price))
        total += roundOff(totalPrice)
        rows.push(
          {
            'imageSrc': <img src={`/assets/${value.type}/${value.image}`} alt="" style={{ width: "50px" }} />,
            'name': <strong> {value.name}</strong>,
            'size': <strong> {data.description[index].size} </strong>,
            'price': <strong> £ {roundOff(value.price)} </strong>,
            'quantity':
              <input name="quantity" value={data.description[index].quantity} className="specialInput border-warning" style={{ width: "100px" }} onChange={(evt) => { handleInputChange(evt, index) }} />,
            'amount': <strong> £ {totalPrice}</strong>,
            'button':
              <MDBIcon far icon="times-circle" className="amber-text" onClick={() => { deleteCart(index) }} />

            // <MDBBtn outline color="amber" size="sm" onClick={() => { deleteCart(index) }}>
            //   X
            // </MDBBtn>
          }
        )
      });
    }
  }
  useEffect(() => {
    // fetch Data
    async function fetchData() {
      await dispatch(fetchCart()).unwrap()
      // if (originalPromiseResult.cart)
      //   setData(originalPromiseResult.cart)
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
  let handleInputChange = async (event, index) => {
    let quantity = parseInt(event.target.value);
    let size = data.description[index].size
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
    if (rows.length === 0 && totalPurchase > 0) {
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
    <div style={{ minHeight: "100vh" }}>
      <MDBRow className="my-2 special-margin" center>
        <MDBCard style={{ marginTop: "50px" }}>
          <MDBCardBody>

            <h3 className="text-warning my-2 text-center"> Shopping Cart </h3>
            {/* Table */}
            <br />
            <MDBTable className="product-table d-none d-lg-table w-80">
              <MDBTableHead className="form-control font-weight-bold" color="amber lighten-5" columns={columns} />
              <MDBTableBody rows={rows} />
            </MDBTable>

            {/* Table */}
            <div className="px-3">
              <div  className="d-grid d-lg-none w-80 border border-warning py-2"
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
            {
              !data.products ||
              data.products[0] === null &&
              <div style={{ textAlign: "center", marginTop: "10px" }}>
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
          </MDBCardBody>



          <MDBCardBody>
            <div className="mb-3">
              <div className="pt-1">
                <p className="text-amber lighten-1 mb-0"><i className="fas fa-info-circle mr-1"></i> Do not delay the purchase, adding
                  items to your cart does not mean booking them.</p>
                {/* <Redirect to="/checkOut"> */}
                <div className="mb-3">
                  <MDBBtn onClick={() => { checkOut(total) }} outline color="amber lighten-1">Check Out</MDBBtn>
                </div>
                {/* </Redirect> */}
              </div>
            </div>

            <div className="mb-3">
              <div className="pt-2">
                <p className="mb-1">We accept the following payment methods:</p>
                <img className="mr-2" width="30px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa" />
                <img className="mr-2" width="30px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express" />
                <img className="mr-2" width="30px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard" />
                <img className="mr-2" width="30px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                  alt="PayPal acceptance mark" />
              </div>
            </div>


          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </div >
  );
}


