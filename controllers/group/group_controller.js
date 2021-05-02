const model = require('../../models');

const { User , Friends , Group , Group_Members} = model;


exports.create_group = async (req, res, next) => {
    const {group_name, created_by, visibility} = req.body;
    const current_user = await User.findOne({ where: { id:  created_by } });
    if (!current_user) {
        return res.status(400).json({
            message: "User not_found",
        });
    }
    const ex_group = await Group.findOne({ where: { group_name: group_name } });
    if (ex_group) {
        return res.status(400).json({
            message: "group name already in use",
        });
    }
    const new_group = await Group.create({
        group_name:group_name,
        created_by:current_user.id,
        visibility:visibility
    });
    if (new_group) {
        return res.status(200).json({
            message: 'group created',
            data:new_group
        });
    }else{
        return res.status(400).json({
            message: "group creation failed",
        });
    }

}

exports.delete_group = async (req, res, next) => {
    const {group_id, userid} = req.body;
    const ex_group = await Group.findOne({ where: { id:group_id } });
    if (!ex_group) {
        return res.status(400).json({
            message: "group not_found",
        });
    }
    const admin_user = await Group.findOne({where:{id:group_id}});
    if(admin_user){
        if(admin_user.created_by != userid){
            return res.status(400).json({
                message: "invalid request",
            });
        }
    }
    const rm_grp = await Group.destroy({ where:{
            id:ex_group.id,
            created_by:userid
        }
    })
    if(rm_grp){
        return res.status(200).json({
            message: "group deleted",
        });
    }
}

exports.add_member = async (req, res, next) => {
    const {userid, g_id, member_id} = req.body;
    const ex_group = await Group.findOne({ where: { id:g_id } });
    console.log(ex_group)
    if (!ex_group) {
        return res.status(400).json({
            message: "group not_found",
        });
    }
    const ex_user = await User.findOne({where:{id:member_id}});
    if (!ex_user) {
        return res.status(400).json({
            message: "user not_found",
        });
    }
    const admin_user = await Group.findOne({where:{id:g_id}});
    console.log(userid)
    if(admin_user){
        if(admin_user.created_by != userid){
            return res.status(400).json({
                message: "invalid request",
            });
        }
    }
    const check_mem = await Group_Members.findOne({ where: { g_id:g_id, member_id:member_id} })
    if(check_mem){
        return res.status(400).json({
            message: "member already exists",
        });
    }
    const add_mem = await Group_Members.create({
        g_id:ex_group.id,
        member_id:ex_user.id
    })
    if(add_mem){
        return res.status(200).json({
            message: "member_added succesfully",
        });
    }else{
        return res.status(400).json({
            message: "err",
        }); 
    }
}

exports.delete_member = async (req, res, next) => {
    const {userid, g_id, member_id} = req.body;
    const ex_group = await Group.findOne({ where: { id:g_id } });
    if (!ex_group) {
        return res.status(400).json({
            message: "group not_found",
        });
    }
    const ex_user = await User.findOne({where:{id:member_id}});
    if (!ex_user) {
        return res.status(400).json({
            message: "user not_found",
        });
    }
    const admin_user = await Group.findOne({where:{id:g_id}});
    console.log(userid)
    if(admin_user){
        if(admin_user.created_by != userid){
            return res.status(400).json({
                message: "invalid request",
            });
        }
    }
    const check_mem = await Group_Members.findOne({ where: { g_id:g_id, member_id:member_id} })
    if(!check_mem){
        return res.status(400).json({
            message: "member not found"
        });
    }
    const rm_mem = await Group_Members.destroy({ where:{
        g_id:ex_group.id,
        member_id:ex_user.id
    }
    })
    if(rm_mem){
        return res.status(200).json({
            message: "member_removed succesfully",
        });
    }else{
        return res.status(400).json({
            message: "err",
        }); 
    }
}