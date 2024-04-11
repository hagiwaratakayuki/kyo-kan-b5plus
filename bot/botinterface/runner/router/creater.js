const path = require("node:path");
const { Saver, Loader } = require("../../../kyo-kan/looploader/save_and_load");
const { Creater } = require("../../creater");

const fs = require("node:fs")


const select = require("../../plugin/create/select")
const parroting = require("../../plugin/create/parroting")
const message = require("../../plugin/create/message");
const createRegisters = [
    select.createrRegister,
    parroting.createrRegister,
    message.createrRegister
]
/**
 * 
 * @param {import("../../../kyo-kan/looploader/base_type").BasicLoader} loader 
 * @param {import("../../../kyo-kan/looploader/save_and_load").Saver} saver 
 */
function createRouter(loader, saver) {
    const routeSaver = new Saver();

    for (const register of createRegisters) {
        register(saver);
        register(loader);
        register(routeSaver)


    }
    routeSaver.addLoopStep(select.name, {})
    routeSaver.startSubLoop('selection');
    routeSaver.addLoopStep(parroting.name, {})
    routeSaver.addLoopStep(message.name, {})
    loader.fromJSON(routeSaver.toJSON());

}



module.exports = { createRouter }