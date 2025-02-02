




const { Context } = require("../../../../kyo-kan/context")
const { ViewParseExecController, HookedVPEUtil } = require("../../pattern/view_parser_exec/basic")
const { createScenarioGenerater } = require("../../pattern/view_parser_exec/scenario")



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
        context.setLoopData(this.options.key, { value: context.getSubLoopData() })
    }

}
function createComponentScenarioGenerater(view, parser) {
    return createScenarioGenerater(DEFAULT_COMPONENTCONTROLLER_ID, view, parser)
}


module.exports = { FormComponentController, createComponentScenarioGenerater, COMPONENTCONTROLLER_ID }