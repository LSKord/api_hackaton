const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post("/login", usersController.login);
router.get('/welcome', usersController.authenticate, (request, response) => {
    response.json({message: `Bienvenido ${request.user.username}!` })
})


module.exports = router;