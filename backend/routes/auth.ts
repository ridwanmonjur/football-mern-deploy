import { login } from "../controllers/auth";

const express = require('express');
const router = express.Router();

router.post('/login', login);

module.exports = router