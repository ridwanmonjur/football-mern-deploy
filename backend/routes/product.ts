var express = require('express');
import {getProducts, getProductById, getProductBytType, deleteProducts} from "../controllers/product"
import { Roles } from "../helper/Roles";
import { authorize } from "../middleware/authorize";
import { protect } from "../middleware/protect";

var router = express.Router();

router.route('/')
        .get(getProducts)
        .delete(protect, authorize(Roles.Admin), deleteProducts)

router.route('/:productId')
        .get(getProductById)

router.route('/type/:productType')
        .get(getProductBytType)

module.exports= router