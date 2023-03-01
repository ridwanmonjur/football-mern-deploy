var express = require('express');
import { addToCartPartTwo, getCart, getCarts, getProductOfCart, editCartQuantity, deleteCart, editStatus, getNewCart } from "../controllers/cart"
import { protect } from "../middleware/auth"
var router = express.Router({ mergeParams: true }); /* mergeParams: true so this route gets routes from other routers, especially auth route*/
require('express-async-errors')

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

module.exports = router