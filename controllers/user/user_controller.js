//importing bcrypt for encrytping password
const hash_password = require('../../utils/Password')
const Token = require('../../utils/Token')
const bcrypt = require('bcrypt');

//date dependency
const date_now =  new Date();

// importing user model
const model = require('../../models');

var jwt = require('jsonwebtoken');



const { User } = model;


//user sign_up function
exports.user_create = async (req, res, next) => {
    const {email, password, username} = req.body;
    const existing_user = await User.findOne({ where: {email:email } });
    if(existing_user){
        return res.status(400).json({
            message:"user exists"
        })
    }
    const existing_uname = await User.findOne({ where: {username:username } });
    if(existing_uname){
        return res.status(400).json({
            message: "Username exists"
        })
    }

    const hash = await hash_password.toHash(password)
    if(!hash){
        return res.status(400).json({
            message: "conversion error",
        });
    }else{
        const create_user = await User.create({
            username:username,
            email:email,
            password:hash
        })
        return res.status(200).json({
            message: "user_created",
            data:create_user
        });
    }
}

exports.user_login = async (req, res, next) => {
    const {email, password} = req.body;

    const ex_user = await User.findOne({ where:{email:email}})
    if(!ex_user){
        return res.status(400).json({
            message: "User not_found",
        });
    }
    const bool = await hash_password.compare(ex_user.password,password)
    if(!bool){
        return res.status(400).json({
            message: "Incorrect password",
        });
    }else{
        const token = await Token.createToken(ex_user.email,ex_user.id);
        return res.status(200).json({
            message: "success",
            id:ex_user.id,
            token:token
        });
    }
}

