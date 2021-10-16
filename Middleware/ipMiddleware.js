const {addIp} = require("../utils/DDOS")
const requestIp = require('request-ip');

exports.ipMiddleware = function(req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    if(!addIp(clientIp)){
      return res.status(500).json({
        success: false,
        message : 'Too many requests please try again'
      })
    }
    console.log('A new request received for ipMiddleware ' + Date.now());
    next();
};
