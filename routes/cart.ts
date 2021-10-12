/*

1. add to cart (size, quantity)
2. Edit size, quantity
3. Delete objet
4. update Paid

*/

var express = require('express');
import { addToCartPartTwo, getCart, getCarts, getProductOfCart, editCartQuantity, deleteCart, editStatus, getNewCart } from "../controllers/cart"
import { protect, authorize,  } from "../middleware/auth"

/* 
 mergeParams: true so this route gets routes from other routers, especially auth route
*/
var router = express.Router({ mergeParams: true });
// /api/v1/cart
// /api/v1/user/:userId/
/* /api/v1/user/:userId/product/:productId */



router.use(protect)

router.route('/')
        .get(getCarts)
        .post(getNewCart)

router.route('/status/:cartId')
        .put(editStatus)

router.route('/projection/cart')
        .get(getCart)


router.route('/product/:productId')
        .post(addToCartPartTwo)
        .put(editCartQuantity)

router.route('/delete/:deleteProductIndex')
        .delete(deleteCart)

router.route('/product/:productId/status')
        .post(getProductOfCart)



// module.exports? or 
// export {router} does not work
// export router gives error
module.exports = router