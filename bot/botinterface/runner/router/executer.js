const parroting = require("../../plugin/parroting")
const message = require("../../plugin/message");

const executeRegisters = [
    parroting.executeRegister,
    message.executeRegister
]

/**
 * 
 * @param {import("../../../kyo-kan/looploader/base_type").BasicLoader} loader 
 */
function executeRouter(loader) {
    for (const register of executeRegisters) {
        register(loader);
    }
}

function main() {
    execute().then(function () {
        process.exit();
    })
}


module.exports = { executeRouter }