import { hostNameWithoutAPI } from "../../api/env";
import { roundOff } from "../../helper/roundOff";
import { MDBIcon } from "mdbreact";

export function generateRows({ isPartOfPurchaseView, data, deleteCart, handleInputChange }) {
    let rows = []
    if (data.products) {
      if (data.products[0] !== null) {
        data.products.forEach((value, index) => {
          let totalPrice  = roundOff(data.description[index].subtotal)
          rows.push(
            {
              ...(!isPartOfPurchaseView && {
              'checkbox': <input type="checkbox" name="checkbox" className="checkout-checkbox"/>,
              }),
              'imageSrc': <img src={`${hostNameWithoutAPI}${value?.image}`} alt="" style={{ width: "50px" }} />,
              'name': <strong> {value.name}</strong>,
              'size': <strong> {data.description[index].size} </strong>,
              'price': <strong> £ {roundOff(value.price)} </strong>,
              'quantity':
                <input type="number" name="quantity" value={data.description[index].quantity} className="specialInput border-warning pl-2" style={{ width: "200px" }} onChange={(evt) => { handleInputChange(evt, index) }} />,
              'amount': <strong> £ {totalPrice}</strong>,
              ...(!isPartOfPurchaseView && {
                'button':
                  <MDBIcon far icon="times-circle" className="amber-text" onClick={() => { deleteCart(index) }} />
              })
            }
          )
        });
      }
    }
    return { rows }
  }