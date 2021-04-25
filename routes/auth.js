const express = require('express');
const router = express.Router();

const authController = require('../controller/auth/authCon');
const registerController = require('../controller/auth/registerCon');
const loginController = require('../controller/auth/loginCon');
const authMW = require('../middleware/authMW');

// Main auth
router.get('/', authMW.CheckIfLoggedAuthenticated, authController.auth);

// Register Page
router.get(
  '/register',
  authMW.CheckIfLoggedAuthenticated,
  registerController.registerGet
);

// Register Page(POST)
router.post('/register', registerController.registerPost);

// Login Page
router.get(
  '/login',
  authMW.CheckIfLoggedAuthenticated,
  loginController.loginGet
);

// Login page(POST)
router.post('/login', loginController.loginPost);

// Logout
router.get('/logout', authMW.CheckAuthenticated, loginController.logOut);

module.exports = router;
