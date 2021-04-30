const express = require('express');
const router  = express.Router();
//importing controller
const UserController = require('../../controllers/user/user_controller');

//user sign_up route
router.post('/sign_up',UserController.user_create);
//user sign_in route
router.post('/signin',UserController.user_login);
module.exports = router; 