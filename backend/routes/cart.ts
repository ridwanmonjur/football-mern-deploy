var express = require('express');
import { addProduct, getOneCart, getCartsOfSignedIn,  editProductQuantity, deleteCartProduct, getNewCart, getAllCarts, deleteCarts } from "../controllers/cart"
import { protect } from "../middleware/auth"
var router = express.Router({ mergeParams: true }); /* mergeParams: true so this route gets routes from other routers, especially auth route*/

router.route('/')
        .delete(deleteCarts)
router.use(protect)

router.route('/')
        .get(getCartsOfSignedIn)
        .get(getAllCarts)
        .post(getNewCart)

router.get('/all', getAllCarts)


router.route('/projection/cart')
        .get(getOneCart)

router.route('/product/:productId')
        .post(addProduct)
        .put(editProductQuantity)

router.route('/delete/:deleteProductIndex')
        .delete(deleteCartProduct)

module.exports = router