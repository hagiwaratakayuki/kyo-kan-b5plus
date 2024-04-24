const { Saver } = require("../looploader/save_and_load");

/**
 * 
 * @param {import("./configure_type").Configure} configure
 * @param {import("../looploader/base_type").BuilderConfigMap} builderConfigureMap  
 * @param {string} [namespace=''] 
 * @param {any} saverClass 
 */
function SaveAndLoadConfig(configure, builderConfigureMap, namespace = '', namespaceKey, delimiter = ':', saverClass = Saver) {
    /**
     * @type {Saver}
     */
    const saver = new saverClass()
    let _builderConfigureMap = !namespace === true ? builderConfigureMap : NameSpaceRegistrater(namespace, builderConfigureMap, namespaceKey, delimiter)
    saver.buildersRegistration(_builderConfigureMap)
    for (const configureNode of configure) {
        _registartion(configureNode, saver)
    }
    return saver

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