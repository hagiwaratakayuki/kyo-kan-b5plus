const process = require('node:process')
module.exports = { argparser }
function argparser() {
    const args = process.argv.slice(2);
    const ret = {}
    for (const arg of args) {

        const [key, value] = arg.split('=')
        ret[key] = value
    }
    return ret
} 