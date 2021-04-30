const express = require('express');
const router  = express.Router();
//importing controller
const friendscontroller = require('../../controllers/friends/friends_controller');

//user add_friends route
router.post('/add_friends',friendscontroller.add_friends);
//user accept_request route
router.put('/acceptrequest',friendscontroller.accept_request);
//user delete_request route
router.delete('/cancelrequest',friendscontroller.cancel_request);
//user allfriends route
router.get('/all_friends/:id',friendscontroller.all_friends);

module.exports = router; 