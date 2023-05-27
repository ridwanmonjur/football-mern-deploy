var express = require('express');
import {getProducts, getProductById, getProductBytType, deleteProducts, createProduct, editProduct} from "../controllers/product"
import { Roles } from "../helper/Roles";
import { authorize } from "../middleware/authorize";
import { protect } from "../middleware/protect";

var router = express.Router();

router.route('/')
        .get(getProducts)
        .post(protect, authorize(Roles.Admin, Roles.Seller,), createProduct)

router.route('/:productId')
        .get(getProductById)
        .put(protect, authorize(Roles.Seller, Roles.Admin), editProduct)

router.route('/type/:productType')
        .get(getProductBytType)

router.post("/delete", protect, authorize(Roles.Admin, Roles.Seller), deleteProducts)

module.exports= router