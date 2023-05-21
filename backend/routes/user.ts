const express = require('express');
import { signup,  getUser, getUsers, getCurrentUser, editCurrentUser } from "../controllers/user";
import { protect } from "../middleware/auth";
const cartRouter = require("./cart");
const router = express.Router();

router.post('/signup', signup);

router.use('/user/cart/', cartRouter);

router.route('/user')
    .get(getUsers);

router.route('/user/:userId')
    .get(getUser);

router.route('/current')
    .get(protect, getCurrentUser)
    .put(protect, editCurrentUser);

module.exports = router