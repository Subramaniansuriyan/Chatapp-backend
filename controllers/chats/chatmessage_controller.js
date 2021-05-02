const model = require('../../models');

const {chatrooms,ChatMessages} = model;


exports.create_message = async (req, res, next) => {
    const {chat_room,message,sent_by} = req.body;

    const existing_chatroom = await chatrooms.findOne({where: { id:chat_room }})
    if(!existing_chatroom){
        return res.status(400).json({
            message: "chatroom doesn't exists",
        });
    }
    const createmessage = await ChatMessages.create({
        chat_room:chat_room,
        message:message,
        sent_by:sent_by
    })
    if(createmessage){
        return res.status(200).json({
            message: "message sent",
        });
    }
}