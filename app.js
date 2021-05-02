const express = require('express');
const app = express();
//for error handling
const morgan = require('morgan');
//for cors error
const bodyParser = require('body-parser');
//for database
// const mongoose = require('mongoose');
//importing cors
var cors = require('cors')
// importing routes
const UserRoutes = require('./routes/user/user_route.js');
const friendsRoutes = require('./routes/friends/friends.js');
const groupRoutes = require('./routes/group/group.js');
const chatroomRoutes = require('./routes/chat/chatRoom.js')
const chatMessageRoutes = require('./routes/chat/chatMessage.js');


//database connection request 
// mongoose.connect('mongodb://localhost:27017/myjarvis');

//using morgan for error handling in development
app.use(morgan('dev'));

//for using static folder
app.use('/uploads',express.static('uploads'));

//body parser for cors
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors())


//defining routes for the app

app.use('/user',UserRoutes);
app.use('/friends',friendsRoutes);
app.use('/groups',groupRoutes);
app.use('/chatroom',chatroomRoutes);
app.use('/chatmessage',chatMessageRoutes);


app.use((req,res,next) => {
	const error = new Error('not found');
	error.status = 404;
	next(error);
    });

app.use((error,req,res,next) => {
	res.status(error.status || 500 );
	res.json({
		error:{
		    message: error.message
			}
	    });
    });


module.exports = app;







