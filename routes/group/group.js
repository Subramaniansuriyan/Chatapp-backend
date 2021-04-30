const express = require('express');
const router  = express.Router();
//importing controller
const groupcontroller = require('../../controllers/group/group_controller');

//create_group route
router.post('/create',groupcontroller.create_group);
//delete_group route
router.delete('/delete',groupcontroller.delete_group);
//add_members route
router.post('/add_members',groupcontroller.add_member);
//delete_members route
router.delete('/delete_members',groupcontroller.delete_member);

module.exports = router; 