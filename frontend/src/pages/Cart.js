import React, { useState, useEffect } from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, editProduct, fetchCart, deleteProduct, selectCartStatus } from "../redux/slices/CartSlice";
import { useHistory } from "react-router";
import "./Cart.css"
import { editProfile } from "../redux/slices/ProfileSlice";
import { roundOff } from "../helper/roundOff";
import { toast } from "react-toastify";
import Empty from "../components/notifications/empty";
import Spinner from "../components/notifications/spinner";
import { deepCopyObj } from "../helper/deepCopy";
import Rodal from "rodal";
import { CustomCollpsibleTable, generateColumns, generateRows, Checkout } from "../components/cart";
import { selectIsSignedIn } from "../redux/slices/ProfileSlice";
export default function Cart({ data = null, isPartOfPurchaseView = false }) {
  let data2 = useSelector(selectCart)
  if (!isPartOfPurchaseView)
    data = deepCopyObj(data2)
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

  let columns = generateColumns({ isPartOfPurchaseView })
  let isSignedIn = useSelector(selectIsSignedIn)
  const cartStatus = useSelector(selectCartStatus)

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchCart())
    }
    if (isSignedIn) fetchData().catch((error) => {
      toast.error(error.message)
    })
    let controller = new AbortController();
    try {
      !isPartOfPurchaseView && isSignedIn && fetchData().catch((error) => {
        toast.error(error.message)
      })
    } catch (error) {
      toast.error(error)
    }
    return () => {
      controller?.abort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length])

  let handleInputChange = async (event, index) => {
    let quantity = parseInt(event.target.value);
    let size = data.description[index].size
    index = parseInt(index)
    if (quantity <= 0) {
      toast.error("value cannot be less than zero");
    }
    else {
      let body = { size, quantity }
      let productId = data.products[index]._id
      await dispatch(editProduct({ productId, index, body }))
    }
  }
  let checkOut = async (totalPurchase) => {
    if (rows.length === 0 && totalPurchase > 0) {
      toast("Purchase an item first!");
    }
    else {
      await dispatch(editProfile({ body: { totalPurchase } }))
      history.replace("/checkOut")
    }
  }

  let deleteCart = (index) => {
    dispatch(deleteProduct(index))
  }

  let { total, rows } = generateRows({ isPartOfPurchaseView, data, deleteCart, handleInputChange })


  return (
    <div style={{ ...(!isPartOfPurchaseView && { minHeight: "100vh" }) }}>
      <MDBRow className="my-2 special-margin" center>
        <MDBCard border="light" style={{ marginTop: "50px", boxShadow: "0px 0px black !important", borderWidth: "0", outlineWidth: "0 important" }} shadow="0">
          <MDBCardBody>
            {!isPartOfPurchaseView && <h3 className="text-warning my-2 text-center"> Shopping Cart </h3>}
            <br />
            <MDBTable className="product-table d-none d-lg-table w-80">
              <MDBTableHead className="form-control font-weight-bold" color="amber lighten-5" columns={columns} />
              <MDBTableBody rows={rows} />
            </MDBTable>

            <CustomCollpsibleTable {...{ data, deleteCart, cartStatus, rows, toggleCollapse, collapse }} />

            {
              (((data.products &&
                !data.products[0] && cartStatus === success) || !isSignedIn) && !isPartOfPurchaseView) &&
              <div className="text-align-center mx-auto mt-5">
                <Empty />
              </div>
            }
            {
              data.products &&
              data.products[0] !== null &&
              !isPartOfPurchaseView &&
              <div className="pr-5">
                <div className="mt-3 d-flex justify-content-end">
                  <strong>TOTAL : &nbsp;</strong>
                  <strong className="ml-4">{roundOff(total)}</strong>
                </div>
              </div>
            }
          </MDBCardBody>
          {
            !isPartOfPurchaseView &&
            <Rodal visible={cartStatus === "loading"} >
              <div className="d-flex justify-content-center align-items-center mt-1 pt-2 h-100">
                <Spinner />
              </div>
            </Rodal>
          }
          <Checkout {...{ isPartOfPurchaseView, checkOut, total }} />
        </MDBCard>
      </MDBRow>
    </div >
  );
}


