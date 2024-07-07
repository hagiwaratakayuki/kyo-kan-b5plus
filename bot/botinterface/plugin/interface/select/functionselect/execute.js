const deepmerge = require("deepmerge");


const { StepControllerClass, MVCUtil } = require("../../../scenario/step_controller");
const { ClassConstructBuilder } = require("../../../utility/classconstructbuilder");
const { Context } = require("../../../../../kyo-kan/context");


class FunctionSelect extends StepControllerClass {
    /**
     * 
     * @param {*} options 
     * @param {*} commonOptions 
     * @param {*} language 
     * @param {import("../../standized_protocol/function_map/basic").StandardizedFunctionMap} funcMap 
     */
    constructor(options, commonOptions, language, funcMap) {
        super(deepmerge(defaultOptions || {}, options || {}), commonOptions, language, funcMap)
    }
    /**
     * 
     * @param {*} request 
     * @param {Context} context 
     * @param {import("../../../../../kyo-kan/state_controller").StateController} stateController 
     */
    in(request, context, stateController) {
        const response = super.in(request, context, stateController)
        const subLoopInit = { message: this.functionMap.i18n('message', this.language) }
        response.subLoopInit.select = stateController.loader.getSubLoopDocuments(this.options?.functionsKey || "functions", ["title"]).map(function (r) {
            return r.document.title

        })

        return response

    }
    /**
     * 
     * @param {*} request 
     * @param {Context} context 
     * @param {import("../../../../../kyo-kan/state_controller").StateController} stateController 
     */
    exec(request, context, stateController) {

        /**
         * @type {StateResponse}
        */
        const response = {
            state: "forwardToSub",
            subid: context.getSubLoopData().select
        }
    }



}
const DEFAULTRENDERERS = [
    { builder: "select.view" }
]
const DEFAULTEXECUTERS = [
    { builder: "select.parse" }
]

const MVCSelectGenarater = function (functions, functionsKey = "functions", cls = FunctionSelect, renderers = DEFAULTEXECUTERS, execs = DEFAULTEXECUTERS) {
    const ret = MVCUtil(ClassConstructBuilder(cls), renderers, execs)
    ret.subLoops[functionsKey] = functions
    return ret
}


module.exports = { MVCSelectGenarater, FunctionSelect }