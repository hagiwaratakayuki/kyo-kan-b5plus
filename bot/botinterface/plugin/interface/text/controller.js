




const { Context } = require("../../../../kyo-kan/context")
const { ViewParseExecController } = require("../../pattern/view_parser_exec/basic")
const { createBuilderIdMap } = require("./syncronaizer")
const I18N_SELECT_OPTION_LABEL_NAMESPACE = "select"
class TextController extends ViewParseExecController {

    /**
     * 
     * @param {*} request 
     * @param {*} context 
     * @param {*} stateController 
     */
    in(request, context, stateController) {

        const response = super.in(request, context, stateController)

        const subLoopInit = { message: this.functionMap.i18n.getMessage('message', this.options), options: [], title: this.functionMap.i18n.getMessage('title', this.options) }


        response.subLoopInit = subLoopInit
        return response

    }
    /**
     * 
     * @param {*} request 
     * @param {Context} context 
     * @param {*} stateController 
     */
    exec(request, context, stateController) {
        context.setLoopData(this.options.formKey, { value: context.getSubLoopData() })
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
    return HookedVPEUtil(this.controller, views, parsers, view?.hooks, parser?.hooks, controllerOptions)

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


module.exports = { BasicSelect, createScenarioGenerater, scenarioGenerater, I18N_SELECT_OPTION_LABEL_NAMESPACE }