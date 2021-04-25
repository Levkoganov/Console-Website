const express = require('express');
const router = express.Router();

// PATH
const xboxController = require('../controller/xboxCon');
const authMW = require('../middleware/authMW');

// XBOX VIEW
router.get('/', authMW.CheckAuthenticated, xboxController.xbox);

module.exports = router;
