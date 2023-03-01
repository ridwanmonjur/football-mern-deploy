var express = require('express');
import {getProducts, getProduct, getProductBytType} from "../controllers/product"
require('express-async-errors')

var router = express.Router();

router.route('/')
        .get(getProducts)

router.route('/:productId')
        .get(getProduct)

router.route('/type/:productType')
        .get(getProductBytType)

module.exports= router