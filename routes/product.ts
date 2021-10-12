var express = require('express');
import {getProducts, getProduct, getProductBytType} from "../controllers/product"
const cartRouter= require("./cart")

var router = express.Router();

router.route('/')
        .get(getProducts)

router.route('/:productId')
        .get(getProduct)

router.route('/type/:productType')
        .get(getProductBytType)

// module.exports? or 
// export {router} does not work
// export router gives error
module.exports= router