/**
 * @this { import("./syncronaizer").builderIdMap }  
 * @param { import("../protocol").Configuration } view
* @param { import("../protocol").Configuration } parser
*/
function scenarioGenerater(controllerOptions, view, parser) {
    /**
     * @type {LoopStepConfigure}
     */
    const views = [{ builder: this.view, options: view?.options }]
    /**
     * @type {LoopStepConfigure}
     */
    const parsers = [{ builder: this.parser, options: parser?.options }]
    return HookedVPEUtil(this.controller, views, parsers, view?.hooks, parser?.hooks, controllerOptions)

}


function createScenarioGenerater(view, parser, controller) {

    return scenarioGenerater.bind({ view, parser, controller })

}



module.exports = { scenarioGenerater, createScenarioGenerater }