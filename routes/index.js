const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router.use("/auth", require('./users'));
router.use("/template", usersController.authenticate, require('./template'));

module.exports = router;