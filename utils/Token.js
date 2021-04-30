var jwt = require('jsonwebtoken');

exports.createToken = async(email,userid) => {
    const jwt_token = jwt.sign({
        email: email,
        id:userid
        }, "shhh");
  
    return jwt_token;
  };