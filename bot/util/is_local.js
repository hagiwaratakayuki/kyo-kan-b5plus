const process = require('node:process');
const { argparser } = require('./argparser');
let IS_LOCAL = 'loocl' in argparser()

function getIsLocal() {
    return IS_LOCAL
}
function setIsLocal(isLocal) {
    IS_LOCAL = isLocal
}

module.exports = { getIsLocal, setIsLocal }