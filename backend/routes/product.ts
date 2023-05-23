var express = require('express');
import {getProducts, getProductById, getProductBytType, deleteProducts} from "../controllers/product"

var router = express.Router();

router.route('/')
        .get(getProducts)
        .delete(deleteProducts)

router.route('/:productId')
        .get(getProductById)

router.route('/type/:productType')
        .get(getProductBytType)

module.exports= router