




const { Context } = require("../../../../kyo-kan/context")
const { ViewParseExecController, HookedVPEUtil, VIEW_KEY } = require("../../pattern/view_parser_exec/basic")
const { createScenarioGenerater } = require("../../pattern/view_parser_exec/scenario")
const { STANDARDIZED_REQUEST_PARSER } = require("./parser/standardized")



const COMPONENTCONTROLLER_ID = "FormComponent"

/**
 * @extends ViewParseExecController<any, import("./componet_protocol").FormComponentOptions >
 */
class FormComponentController extends ViewParseExecController {

    /**
     * 
     * @param {*} request 
     * @param {*} context 
     * @param {*} stateController 
     */
    in(request, context, stateController) {

        const response = super.in(request, context, stateController)
        if (response.subkey == VIEW_KEY) {
            const subLoopInit = { message: this.functionMap.i18n.getMessage('message', this.options), options: [], title: this.functionMap.i18n.getMessage('title', this.options), key: this.options.key, isSingle: this.options.isSingle }


            response.subLoopInit = subLoopInit
        }

        return response

    }
    /**
     * 
     * @param {*} request 
     * @param {Context} context 
     * @param {*} stateController 
     */
    exec(request, context, stateController) {
        context.setLoopData(this.options.key, { value: context.getSubLoopData() })
    }

}
function createComponentScenarioGenerater(view, controller = COMPONENTCONTROLLER_ID, parser = STANDARDIZED_REQUEST_PARSER) {
    return createScenarioGenerater(controller, view, parser)
}


module.exports = { FormComponentController, createComponentScenarioGenerater, COMPONENTCONTROLLER_ID }