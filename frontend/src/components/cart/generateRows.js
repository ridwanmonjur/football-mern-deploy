import { roundOff } from "../../helper/roundOff";
import { hostNameWithoutAPI } from "../../api/env";
import { MDBIcon } from "mdbreact";

export function generateRows({ isPartOfPurchaseView, data, deleteCart, handleInputChange }) {
    let total = 0
    let rows = []
    if (data.products) {
      if (data.products[0] !== null) {
        data.products.forEach((value, index) => {
          let totalPrice = 0
          totalPrice = parseFloat(data.description[index].quantity) * roundOff(parseFloat(value.price))
          total += roundOff(totalPrice)
          rows.push(
            {
              'imageSrc': <img src={`${hostNameWithoutAPI}assets/${value.type}/${value.image}`} alt="" style={{ width: "50px" }} />,
              'name': <strong> {value.name}</strong>,
              'size': <strong> {data.description[index].size} </strong>,
              'price': <strong> £ {roundOff(value.price)} </strong>,
              'quantity':
                <input name="quantity" value={data.description[index].quantity} className="specialInput border-warning" style={{ width: "100px" }} onChange={(evt) => { handleInputChange(evt, index) }} />,
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
    return { rows, total }
  }