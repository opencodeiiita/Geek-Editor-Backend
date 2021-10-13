const crypto = require("crypto");

exports.secureId = () => {
    var token = crypto.randomBytes(64).toString('hex');
    return token
}
