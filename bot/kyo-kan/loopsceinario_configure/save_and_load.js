const { Saver } = require("../looploader/save_and_load");

/**
 * 
 * @param {import("./configure_type").Configure} configure
 * @param {import("../looploader/base_type").BuilderConfigMap} builderConfigureMap  
 * @param {any} saverClass 
 */
function SaveAndLoadConfig(configure, builderConfigureMap, saverClass = Saver) {
    /**
     * @type {Saver}
     */
    const saver = new saverClass()
    saver.buildersRegistration(builderConfigureMap)
    for (const configureNode of configure) {
        _registartion(configureNode, saver)
    }

}
/**
 * 
 * @param {import("./configure_type").ConfigureNode} configureNode 
 * @param {Saver} saver 
 */
function _registartion(configureNode, saver) {
    saver.addLoopStep(configureNode.builder, configureNode.options)
    if (!configureNode.subLoops === false) {
        for (const [subLoopKey, subLoop] of Object.entries(configureNode.subLoops)) {
            saver.startSubLoop(subLoopKey, subLoop.type)
            for (const subNode of subLoop.configures) {
                _registartion(subNode, saver)
            }

            saver.endSubLoop()
        }
    }


}
module.exports = { SaveAndLoadConfig }