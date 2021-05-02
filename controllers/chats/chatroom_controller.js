const model = require('../../models');

const { User , Friends , Group , Group_Members, chatrooms} = model;


exports.create_chatroom = async (req, res, next) => {
    const {userid, friendid} = req.body;
    const current_user = await chatrooms.findOne({ 
        where: {user:{in:[userid,friendid]}}
    });
    console.log(current_user)
    if (current_user){
        if(current_user.user.includes(userid) && current_user.user.includes(friendid) ){
            return res.status(400).json({
                message: "chatroom exists",
            });
        }
    }
    // }else{
    //     const current_user = await chatrooms.findOne({ where: {user:[friendid,userid]}});
    //     if (current_user){
    //         if(current_user.user.includes(userid) && current_user.user.includes(friendid) )
    //             return res.status(400).json({
    //                 message: "chatroom exists",
    //             });
    //         } 
    // }
    const new_chatroom = await chatrooms.create({ user:[userid,friendid] });
    return res.status(200).json({
        message: "chatroom_created",
    });
}