var express = require('express');
import { addProduct, getOneCart, getCartsOfSignedIn, editProductQuantity, deleteCartProduct, getNewCart, getAllCarts, deleteCarts } from "../controllers/cart"
import { Roles } from "../helper/Roles";
import { authorize } from "../middleware/authorize";
import { protect } from "../middleware/protect"
var router = express.Router({ mergeParams: true }); /* mergeParams: true so this route gets routes from other routers, especially auth route*/

router.use(protect)

router.route('/')
        .get(authorize(Roles.Customer), getCartsOfSignedIn)
        .get(authorize(Roles.Seller, Roles.Admin), getAllCarts)
        .post(authorize(Roles.Admin), getNewCart);


router.get('/all', getAllCarts)
router.post("/delete", authorize(Roles.Admin), deleteCarts);
router.get('/projection/cart', getOneCart)
router.get('/delete/:deleteProductIndex', deleteCartProduct)

router.route('/product/:productId')
        .post(authorize(Roles.Customer), addProduct)
        .put(authorize(Roles.Customer), editProductQuantity)


module.exports = router