var express = require('express');
import { addProduct, getOneCart, getCartsOfSignedIn,  editProductQuantity, deleteCartProduct, getNewCart, getAllCarts, deleteCarts } from "../controllers/cart"
import { Roles } from "../helper/Roles";
import { authorize } from "../middleware/authorize";
import { protect } from "../middleware/protect"
var router = express.Router({ mergeParams: true }); /* mergeParams: true so this route gets routes from other routers, especially auth route*/


router.use(protect)

router.route('/')
        .get(authorize(Roles.Customer), getCartsOfSignedIn)
        .get(authorize(Roles.Seller, Roles.Admin), getAllCarts)
        .post(authorize(Roles.Admin), getNewCart)
        .delete(authorize(Roles.Admin), deleteCarts)

router.get('/all', getAllCarts)


router.route('/projection/cart')
        .get(getOneCart)

router.route('/product/:productId')
        .post(addProduct)
        .put(editProductQuantity)

router.route('/delete/:deleteProductIndex')
        .delete(deleteCartProduct)

module.exports = router