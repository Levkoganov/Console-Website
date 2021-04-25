const express = require('express');
const router = express.Router();

// PATH
const authMW = require('../middleware/authMW');
const updateController = require('../controller/settingCon');

// UPDATE USERNAME PAGE(GET)
router.get('/update', authMW.CheckAuthenticated, updateController.updateGet);

// UPDATE USERNAME PAGE(GET)
router.post('/update', updateController.updatePost);

module.exports = router;
