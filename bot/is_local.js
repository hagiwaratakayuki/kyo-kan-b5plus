const process = require('node:process');
IS_LOCAL = process.argv.length == 3


module.exports.isLocal = function () {
    return IS_LOCAL
}