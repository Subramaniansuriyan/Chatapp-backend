const model = require('../../models');

const { User , Friends } = model;



exports.add_friends = async (req, res, next) => {
    const {userid, friendid, status} = req.body;
    const current_user = await User.findOne({ where: { id:  userid } });
    if (!current_user) {
        return res.status(404).json({
            message: "User not_found",
        });
    }
    const friend = await User.findOne({ where: { id:  friendid } });
    if (!friend) {
        return res.status(404).json({
            message: "User not_found",
        }); 
    }
    const check_list = await Friends.findOne({ where: { friendid:current_user.id}});
    if (check_list){
        if(check_list.userid === friendid && check_list.status === 'Request sent' || check_list.userid === friendid && check_list.status === 'Friends'){
            return res.status(400).json({
                message: 'Invalid request'
            });
        }
    }
    const check_status = await Friends.findOne({ where: { userid:current_user.id,friendid:friend.id}});
    if (check_status){
        if (check_status.status === 'Request sent') {
            return res.status(400).json({
                message: "Request already sent"
            });
        }else if(check_status.status === 'Friends'){
            return res.status(400).json({
                message: "Friends"
            });
        }
    }else{
        const create_friend = await Friends.create({
            userid:current_user.id,
            friendid:friend.id,
            status:status
        })
        return res.status(200).json({
            message: "Request sent waiting for approval"
        });
    }
}

exports.accept_request = async (req, res, next) =>{
    const {userid, friendid} = req.body;
    const current_user = await User.findOne({ where: { id:  userid } });
    if (!current_user) {
        return res.status(404).json({
            message: "User not_found",
        });
    }
    const friend = await User.findOne({ where: { id:  friendid } });
    if (!friend) {
        return res.status(404).json({
            message: "User not_found",
        }); 
    }
    const ex_user = await Friends.findOne({ where: { userid:friend.id,friendid:current_user.id}});
    if(ex_user){
        const change_status = await Friends.update({status:"Friends"},{ where: { userid:friend.id,friendid:current_user.id}})
        return res.status(200).json({
            message: "Request accepted",
        }); 
    }else{
        return res.status(400).json({
            message: "Request Not_found",
        }); 
    }
}

exports.cancel_request = async (req, res, next) =>{
    const {userid, friendid} = req.body;
    const current_user = await User.findOne({ where: { id:  userid } });
    if (!current_user) {
        return res.status(404).json({
            message: "User not_found",
        });
    }
    const friend = await User.findOne({ where: { id:  friendid } });
    if (!friend) {
        return res.status(404).json({
            message: "User not_found",
        }); 
    }
    const ex_user = await Friends.findOne({ where: { userid:current_user.id,friendid:friend.id}});
    if(ex_user){
        const del_request = Friends.destroy({ where: { userid:current_user.id,friendid:friend.id,status:'Request sent'}})
        return res.status(200).json({
            message: "Request cancelled",
        }); 
    }else{
        return res.status(400).json({
            message: "Request Not_found",
        }); 
    }
}

exports.all_friends = async (req, res, next) =>{
    const userid  = req.params['id'];
    console.log(userid)
    const current_user = await User.findOne({ where: { id:  userid } });
    if (!current_user) {
        return res.status(404).json({
            message: "User not_found",
        });
    }
    const ex_user = await Friends.findOne({ where: { userid:current_user.id}});
    if(ex_user){
        const friends_list = await Friends.findAll({ where: { userid:current_user.id,status:'Friends'}})
        return res.status(200).json({
            data:friends_list
        }); 
    }else{
        return res.status(400).json({
            message: "Friends not_found",
        }); 
    }
}