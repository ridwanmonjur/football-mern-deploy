var express = require('express');
import {getProducts, getProductById, getProductBytType, deleteProducts, createProduct, editProduct} from "../controllers/product"
import { Roles } from "../helper/Roles";
import { authorize } from "../middleware/authorize";
import { protect } from "../middleware/protect";

var router = express.Router();

router.route('/')
        .get(getProducts)
        .post(protect, authorize(Roles.Admin, Roles.Seller,), createProduct)
        .delete(protect, authorize(Roles.Admin, Roles.Seller,), deleteProducts)

router.route('/:productId')
        .get(getProductById)
        .put(protect, authorize(Roles.Seller, Roles.Customer), editProduct)

router.route('/type/:productType')
        .get(getProductBytType)

module.exports= router