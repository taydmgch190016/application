const express = require('express');
const authRouter = express.Router();
const authController = require("../controllers/authController");


authRouter.post('/doLogin', authController.handleLogin);

authRouter.get('/login', authController.getLogin);

authRouter.get('/logout', authController.handleLogout);

module.exports = authRouter;