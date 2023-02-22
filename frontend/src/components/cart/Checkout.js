import { MDBCardBody, MDBBtn } from "mdbreact"
export function Checkout({ isPartOfPurchaseView, checkOut, total }) {
    return (
      <>
        {
          !isPartOfPurchaseView &&
          <>
            <MDBCardBody className="mx-5">
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
          </>
        }</>
    )
  }