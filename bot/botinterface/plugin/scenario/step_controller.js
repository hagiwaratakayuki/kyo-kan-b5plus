/**
 * @typedef {import("../../../kyo-kan/context").Context} Context
 */

const { ClassConstructBuilder } = require("../utility/classconstructbuilder")


const RENDERER_KEY = "renderer"
const EXEC_KEY = "exec"
//Kyo-Kan MVC



class StepControllerClass {
    /**
     * @template T
     * @param {*} options 
     * @param {*} commonOptions 
     * @param {*} language 
     * @param {T} functionMap 
     */
    constructor(options, commonOptions, language, functionMap) {


        this.options = options
        this.commonOptions = commonOptions,
            this.language = language
        /**
         * @type {T}
         */
        this.functionMap = functionMap
    }

    /**
     * @param {Context} context
     * @returns {import("../../../kyo-kan/plugin_type").StateResponse}
    */
    in(request, context, stateController) {

        return {
            state: "forwardToSub",
            subkey: RENDERER_KEY,
            callback: "afterRender"
        }

    }
    /**
     *  @returns {import("../../../kyo-kan/plugin_type").StateResponse}
    */
    afterRender(request, context, stateController) {
        return {
            state: "wait",
            callback: "acceptRequest"
        }


    }
    /**
     * @returns { import("../../../kyo-kan/plugin_type").StateResponse }
     */

    acceptRequest(request, context, stateController) {
        return {
            state: "forwardToSub",
            subkey: EXEC_KEY,
            callback: "exec"
        }

    }
    /**
     * @returns { import("../../../kyo-kan/plugin_type").StateResponse }
     */

    exec(request, context, stateController) {

    }
}
/**
 * @typedef {import("../../../kyo-kan/loopsceinario_configure/configure_type").LoopStepConfigure} LoopStepConfigure
 * @typedef {LoopStepConfigure[]} LoopStepConfigures
 * @param {*} builder
 * @param {LoopStepConfigures} renderers 
 * @param {LoopStepConfigures} execs
 * @returns {LoopStepConfigure}
 */
function MVCUtil(builder, renderers, execs, options) {
    /**
     * @type {LoopStepConfigure}
     */
    const ret = {
        builder,
        options,
        subLoops: {

        }
    }

    ret.subLoops[RENDERER_KEY] = { type: "loop", loopSteps: renderers }
    ret.subLoops[EXEC_KEY] = { type: "loop", loopSteps: execs }
    return ret


}

module.exports = { StepControllerClass, EXEC_KEY, RENDERER_KEY, MVCUtil }




