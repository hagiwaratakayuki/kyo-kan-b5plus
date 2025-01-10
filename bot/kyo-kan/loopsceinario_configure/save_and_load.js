const deepmerge = require("deepmerge");
const { NameSpaceRegistrater } = require("../contract/namspace");
const { Saver } = require("../looploader/save_and_load");
const crypto = require("node:crypto");
const DEFAULT_OPTIONS = { builderIdPrefix: 'buider_' };


/**
 * 
 * @param {import("./configure_type").LoopScenarioConfigure} loopScenarioConfigure
 * @param {import("../looploader/base_type").BuilderConfigMap} builderConfigureMap  
 * @param {string} [namespace=''] 
 * @param {any} saverClass
 * @returns {Saver} 
 */
function SaveAndLoadConfig(loopScenarioConfigure, builderConfigureMap, options = {}, saverClass = Saver) {
    /**
     * @type {Saver}
     */
    const saver = new saverClass()
    const _options = deepmerge(DEFAULT_OPTIONS, options)


    saver.buildersRegistration(builderConfigureMap)
    for (const [name, loopScenario] of Object.entries(loopScenarioConfigure.LoopScenarios)) {
        saver.startNamedLoopScenario(name, loopScenario.type)
        for (const namedScenarioConfigure of loopScenario.loopSteps) {
            _registartion(namedScenarioConfigure, saver, _options)
        }

        saver.endNamedScenario()

    }
    for (const loopStep of loopScenarioConfigure.RootScenario) {
        _registartion(loopStep, saver, _options)
    }
    return saver

}



/**
 * 
 * @param {import("./configure_type").LoopStepConfigure} configureNode 
 * @param {Saver} saver 
 */
function _registartion(configureNode, saver, options) {
    let builderId
    const _options = deepmerge(DEFAULT_OPTIONS, options);
    if (typeof configureNode.builder !== 'string') {
        builderId = _options.builderIdPrefix + crypto.randomUUID()
        saver.builderRegistration(builderId, configureNode)
    }
    else {
        builderId = configureNode.builder
    }

    saver.addLoopStep(builderId, configureNode.options)
    if (!configureNode.subLoops === false) {
        for (const [subLoopKey, subLoop] of Object.entries(configureNode.subLoops)) {
            if (typeof subLoop === "string") {
                saver.startSubLoop(null, subLoopKey, subLoop)
                saver.endSubLoop()
                continue
            }

            saver.startSubLoop(subLoop.type, subLoopKey)
            for (const subNode of subLoop.loopSteps) {

                _registartion(subNode, saver, _options)
            }

            saver.endSubLoop()
        }
    }



}
module.exports = { SaveAndLoadConfig }