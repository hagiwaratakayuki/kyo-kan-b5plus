


const { ViewParseExecController, HookedVPEUtil } = require("../../../pattern/view_parser_exec/basic");
const { createBuilderIdMap } = require("./syncronaizer")

class BasicSelect extends ViewParseExecController {

    /**
     * 
     * @param {*} request 
     * @param {Context} context 
     * @param {*} stateController 
     */
    in(request, context, stateController) {

        const response = super.in(request, context, stateController)

        const subLoopInit = { message: this.functionMap.i18n('message', this.language), options: [] }

        /**
         * @type {import("../protocol").Options}
         */
        const options = this.options;
        for (const key of options.selects) {
            subLoopInit.options.push({ key, message: this.functionMap.i18n.getMessage('selects.' + key, this.language, this.options) })

        }
        response.subLoopInit = subLoopInit
        return response

    }

}

/**
 * @typedef {import("../../../pattern/view_parser_exec/basic").LoopStepConfigure} LoopStepConfigure
 * 
*/
/**
 * @this {import("./syncronaizer").builderIdMap}  
 * @param {import("../protocol").Configuration} view 
 * @param {import("../protocol").Configuration} parser 
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
    return HookedVPEUtil(this.controller, views, parsers, view.hooks, parser.hooks, controllerOptions)

}

/**
 * 
 * 
 * @param {import("./syncronaizer").builderIdMap} builderIdMap
 * 
 */
function createScenarioGenerater(controllerId, builderIdMap) {
    const _builderIdMap = createBuilderIdMap(controllerId, builderIdMap)
    return scenarioGenerater.bind(_builderIdMap)

}


module.exports = { BasicSelect, createScenarioGenerater, scenarioGenerater }