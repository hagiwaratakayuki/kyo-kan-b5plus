const { NameSpaceRegistrater } = require("../contract/namspace");
const { Saver } = require("../looploader/save_and_load");

/**
 * 
 * @param {import("./configure_type").LoopScenarioConfigure} loopScenarioConfigure
 * @param {import("../looploader/base_type").BuilderConfigMap} builderConfigureMap  
 * @param {string} [namespace=''] 
 * @param {any} saverClass 
 */
function SaveAndLoadConfig(loopScenarioConfigure, builderConfigureMap, namespace = '', namespaceKey, delimiter = ':', saverClass = Saver) {
    /**
     * @type {Saver}
     */
    const saver = new saverClass()
    let _builderConfigureMap = !namespace === true ? builderConfigureMap : NameSpaceRegistrater(namespace, builderConfigureMap, namespaceKey, delimiter)
    saver.buildersRegistration(_builderConfigureMap)
    for (const [name, loopScenario] of Object.entries(loopScenarioConfigure.LoopScenarios)) {
        saver.startNamedLoopScenario(name, loopScenario.type)
        _registartion(loopScenarioConfigure, saver)
        saver.endNamedScenario()

    }
    for (const loopStep of loopScenarioConfigure.RootScenario) {
        _registartion(loopStep, saver)
    }
    return saver

}



/**
 * 
 * @param {import("./configure_type").LoopStep} configureNode 
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