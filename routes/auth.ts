var express = require('express');
import { signup, login, sayHi, getUser, getUsers, getCurrentUser, editCurrentUser } from "../controllers/auth"
const cartRouter = require("./cart")

var router = express.Router();
router.get('/', sayHi)
router.post('/signup', signup)
router.post('/login', login)

// MUST WRITE THESE AT TOP!!!!!!!!!!!!!!!!!!!!!!!!

/* Re-route into other resource routers means
        "/api/v1/user/:userId/cart"
will from now get resurce from the cartRouter for "/api/v1/cart/"

meaning: 
Inside
router.route('/') is for 
"/api/v1/cart/"
"/api/v1/user/:userId/cart"
*/

/* /api/v1/user/:userId/product/:productId */
/* /api/v1/user/:userId/cart */
router.use('/user/cart/', cartRouter);
import { protect, authorize } from "../middleware/auth"


router.route('/user')
    .get(getUsers)
router.route('/user/:userId')
    .get(getUser)
router.route('/current')
    .get(protect, getCurrentUser)
    .put(protect, editCurrentUser)




// module.exports? or 
// export {router} does not work
// export router gives error
module.exports = router