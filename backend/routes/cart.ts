var express = require('express');
import { addProduct, getCart, getCarts,  editProductQuantity, deleteCartProduct, getNewCart } from "../controllers/cart"
import { protect } from "../middleware/auth"
var router = express.Router({ mergeParams: true }); /* mergeParams: true so this route gets routes from other routers, especially auth route*/

router.use(protect)

router.route('/')
        .get(getCarts)
        .post(getNewCart)

router.route('/projection/cart')
        .get(getCart)

router.route('/product/:productId')
        .post(addProduct)
        .put(editProductQuantity)

router.route('/delete/:deleteProductIndex')
        .delete(deleteCartProduct)

module.exports = router