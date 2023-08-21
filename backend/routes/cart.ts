var express = require('express');
import { addProduct, getOneCart, getCartsOfSignedIn, editProductQuantity, deleteCartProduct, payCart, getAllCarts, deleteCarts } from "../controllers/cart"
import { Roles } from "../helper/Roles";
import { authorize } from "../middleware/authorize";
import { protect } from "../middleware/protect"
var router = express.Router({ mergeParams: true }); /* mergeParams: true so this route gets routes from other routers, especially auth route*/

router.route('/')
        .get(protect, authorize(Roles.Customer), getCartsOfSignedIn)
        .post(protect, authorize(Roles.Admin), payCart);

router.get('/all', protect, authorize(Roles.Admin), getAllCarts)
router.post("/delete", protect, authorize(Roles.Admin), deleteCarts);
router.get('/projection/cart', protect, authorize(Roles.Customer), getOneCart)

router.route('/product/:productId')
        .post(protect, authorize(Roles.Customer), addProduct)
        .put(protect, authorize(Roles.Customer, Roles.Admin), editProductQuantity)

router.delete('/delete/:deleteProductIndex', protect, authorize(Roles.Customer, Roles.Admin), deleteCartProduct)

module.exports = router