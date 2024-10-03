/**
 * @typedef {import("../../../../kyo-kan/context").Context} Context
 */

const { ClassBasicTemplate } = require("../class_basic")




const RENDERER_KEY = "renderer"
const EXEC_KEY = "exec"




class ViewParseExecTemplate extends ClassBasicTemplate {

    /**
     * @param {Context} context
     * @returns {import("../../../../kyo-kan/plugin_type").StateResponse}
    */
    in(request, context, stateController) {

        return {
            state: "forwardToSub",
            subkey: RENDERER_KEY,
            callback: "afterRender"
        }

    }
    /**
     *  @returns {import("../../../../kyo-kan/plugin_type").StateResponse}
    */
    afterRender(request, context, stateController) {
        return {
            state: "wait",
            callback: "acceptRequest"
        }


    }
    /**
     * @returns { import("../../../../kyo-kan/plugin_type").StateResponse }
     */

    acceptRequest(request, context, stateController) {
        return {
            state: "forwardToSub",
            subkey: EXEC_KEY,
            callback: "exec"
        }

    }
    /**
     * @returns { import("../../../../kyo-kan/plugin_type").StateResponse }
     */

    exec(request, context, stateController) {

    }
}
/**
 * View Parse Exec Pattern
 * @typedef {import("../../../../kyo-kan/loopsceinario_configure/configure_type").LoopStepConfigure} LoopStepConfigure
 * @typedef {LoopStepConfigure[]} LoopStepConfigures
 * @param {*} builder
 * @param {LoopStepConfigures} renderers 
 * @param {LoopStepConfigures} execs
 * @returns {LoopStepConfigure}
 */
function VPEUtil(builder, renderers, execs, options) {
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

module.exports = { ViewParseExecTemplate, EXEC_KEY, RENDERER_KEY, VPEUtil }




