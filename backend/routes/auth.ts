import { login, refreshToken, logout } from "../controllers/auth";

const express = require('express');
const router = express.Router();

router.post('/login', login);

router.post('/refreshToken', refreshToken);

router.post('/login', logout);
module.exports = router