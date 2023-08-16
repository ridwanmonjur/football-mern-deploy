var express = require('express');
import {getProducts, getProductById, getProductBytType, deleteProducts, createProduct, editProduct, createComment, editComment, deleteComment} from "../controllers/product"
import { Roles } from "../helper/Roles";
import { authorize } from "../middleware/authorize";
import { protect } from "../middleware/protect";
const multer = require("../middleware/multer")
const router = express.Router();

router.route('/')
        .get(getProducts)
        .post(protect, authorize(Roles.Admin, Roles.Seller,), multer.single("image"), createProduct)

router.route('/:productId')
        .get(getProductById)
        .put(protect, authorize(Roles.Seller, Roles.Admin), multer.single("image"), editProduct)

router.route('/type/:productType')
        .get(getProductBytType)

router.post("/delete", protect, authorize(Roles.Admin, Roles.Seller), deleteProducts)

router.route('/:productId/comment/')
        .post(protect, authorize(Roles.Customer), createComment)

router.route('/:productId/comment/:commentId')
        .put(protect, authorize(Roles.Customer), editComment)

router.route('/:productId/comment/:commentId/delete')
        .post(protect, authorize(Roles.Customer), deleteComment)

module.exports= router