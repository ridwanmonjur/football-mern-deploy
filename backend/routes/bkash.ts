const express = require('express');
import { createPayment, executePayment, status } from "../controllers/bkash";
const router = express.Router();

router.get('/executePayment', executePayment);

router.get('/status', status);

router.post('/createPayment', createPayment);

module.exports = router