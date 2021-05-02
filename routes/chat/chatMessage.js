const express = require('express');
const router  = express.Router();
//importing controller
const chatmessagecontroller = require('../../controllers/chats/chatmessage_controller.js');

//user add_friends route
router.post('/send_message',chatmessagecontroller.create_message);

module.exports = router; 