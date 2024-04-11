const readlineSync = require('readline-sync');



/**
 * @typedef {import("./message").CreateRequest} CreateRequest
 * @typedef {import("../../kyo-kan/plugin").StateResponse} StateResponse
 * @typedef {import("../../kyo-kan/plugin").PlugIn} PlugIns
 * @typedef {import("../../kyo-kan/looploader/base_type").BuilderConfigMap} BuilderConfigMap
 * @typedef {import("../../kyo-kan/looploader/save_and_load").Saver} Saver
 * @typedef {{message:string}} MessageOption
 */
const name = "parroting"



/**
 * 
 * @param {Saver} saver 
 */
function executeRegister(saver) {
    saver.builderRegistration(name, {
        builder: executerBuilder
    })

}

/**
 * 
 * @param {any} options 
 */
function executerBuilder(options) {
    /**
     * @type {PlugIns}
     */
    const res = {
        in: function () {

            const message = readlineSync.question("say samething: ")
            console.log("you said " + message)
        }
    }
    return res

}
module.exports = { name, executeRegister }
