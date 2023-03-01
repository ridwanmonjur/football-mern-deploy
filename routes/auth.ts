const express = require('express');
import { signup, login,  getUser, getUsers, getCurrentUser, editCurrentUser } from "../controllers/user";
import { protect } from "../middleware/auth";
const cartRouter = require("./cart");
const router = express.Router();
require('express-async-errors')

router.post('/signup', signup);

router.post('/login', login);

router.use('/user/cart/', cartRouter);

router.route('/user')
    .get(getUsers);

router.route('/user/:userId')
    .get(getUser);

router.route('/current')
    .get(protect, getCurrentUser)
    .put(protect, editCurrentUser);

module.exports = router