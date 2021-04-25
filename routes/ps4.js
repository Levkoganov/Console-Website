const express = require('express');
const router = express.Router();
const authMW = require('../middleware/authMW');

// PATH
const ps4Controller = require('../controller/ps4Con');

// SONY VIEW //
router.get('/', authMW.CheckAuthenticated, ps4Controller.ps4);

module.exports = router;
