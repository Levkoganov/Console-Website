const express = require('express');
const router = express.Router();

// CONTROLLER PATH //
const homeController = require('../controller/homeCon');

// HOME VIEW
router.get('/', homeController.home);

module.exports = router;
