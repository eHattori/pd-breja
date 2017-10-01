var config = require("../api/config")
var jwt = require('jsonwebtoken');

var auth = function(req, res, next){
    var token = req.headers['authorization'];
    
    jwt.verify(token, config.secret, function(err, decoded) {

        if (err) {
            return res.status(401).send('missing authorization header');
        } else {
            next();
        }
    });
}

module.exports = auth;
