const express = require("express");
const router = express.Router();
const SslCommerzPayment = require("../controllers/sslCommerz");
const SslCommerzPaymentInstance = new SslCommerzPayment();

router.post("/user/:userId:/init", SslCommerzPaymentInstance.init);
router.post("/validate/:valId", SslCommerzPaymentInstance.validate);
router.post("/transaction/:transactionId", SslCommerzPaymentInstance.transactionQueryByTransactionId);

module.exports = router;
