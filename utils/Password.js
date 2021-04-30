var bcrypt = require('bcryptjs');


exports.toHash = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

exports.compare = async (storedPassword, givenPassword) => {
    const bool = await bcrypt.compare(givenPassword, storedPassword);
    return bool;
}

// module.exports = toHash;
// module.exports = compare;