const express = require('express');
const router  = express.Router();
//importing controller
const chatroom_controller = require('../../controllers/chats/chatroom_controller');

//user add_friends route
router.post('/create',chatroom_controller.create_chatroom);

module.exports = router; 