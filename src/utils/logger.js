var winston = require('winston');
var config = require('../api/config')
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [        
        new winston.transports.Console({
            level: config.logLevel,
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
