const express = require('express');
import { signup, getUser, getUsers, getCurrentUser, editCurrentUser, deleteUsers, editUserById } from "../controllers/user";
import { Roles } from "../helper/Roles";
import { authorize } from "../middleware/authorize";
import { protect } from "../middleware/protect";
const cartRouter = require("./cart");
const router = express.Router();

router.post('/signup', signup);
router.use('/user/cart/', cartRouter);

router.route('/user')
    .get(protect, authorize(Roles.Admin), getUsers)
    .post(protect, authorize(Roles.Admin), signup)

router.route('/user/:userId')
    .get(getUser)
    .put(protect, authorize(Roles.Admin), editUserById);

router
    .post("user/delete", protect, authorize(Roles.Admin), deleteUsers);


router.route('/current')
    .get(protect, getCurrentUser)
    .put(protect, editCurrentUser);

module.exports = router