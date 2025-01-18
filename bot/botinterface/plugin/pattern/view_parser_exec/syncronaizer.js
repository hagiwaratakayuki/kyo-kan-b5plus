

/**
 * 
 * @param {*} controller 
 * @param {builderIdMap} builderIdMap 
 */
function synchronizeBuilderConfiguration(controller, view, parser, builderIdMap) {

    /**
     * @type {import("../../../../../kyo-kan/looploader/base_type").BuilderConfigMap}
     *  
     */
    const builders = {}
    builders[builderIdMap.view] = {
        builder: view
    }
    builders[builderIdMap.parser] = {
        builder: parser
    }
    builders[builderIdMap.controller] = {
        builder: controller
    }
    return builders



}

module.exports = { synchronizeBuilderConfiguration }
