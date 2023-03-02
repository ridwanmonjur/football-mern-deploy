var express = require('express');
import {getProducts, getProductById, getProductBytType} from "../controllers/product"

var router = express.Router();

router.route('/')
        .get(getProducts)

router.route('/:productId')
        .get(getProductById)

router.route('/type/:productType')
        .get(getProductBytType)

module.exports= router