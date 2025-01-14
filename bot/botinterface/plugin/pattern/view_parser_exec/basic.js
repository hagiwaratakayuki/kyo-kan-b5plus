/**
 * @typedef {import("../../../../kyo-kan/context").Context} Context
 */

const { ClassBasicTemplate } = require("../class_basic")




const VIEW_KEY = "view"
const PARSE_KEY = "parse"




class ViewParseExecController extends ClassBasicTemplate {
    constructor() {
        super({}, {}, '', { i18n: function () { } })
    }
    /**
     * @param {Context} context
     * @returns {import("../../../../kyo-kan/plugin_type").StateResponse}
    */
    in(request, context, stateController) {

        return {
            state: "forwardToSub",
            subkey: VIEW_KEY,
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
            subkey: PARSE_KEY,
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
 * @param {LoopStepConfigures} views 
 * @param {LoopStepConfigures} parsers
 * @returns {LoopStepConfigure}
 */
function VPEUtil(builder, views, parsers, options) {
    /**
     * @type {LoopStepConfigure}
     */
    const ret = {
        builder,
        options,
        subLoops: {

        }
    }

    ret.subLoops[VIEW_KEY] = { type: "loop", loopSteps: views }
    ret.subLoops[PARSE_KEY] = { type: "loop", loopSteps: parsers }
    return ret


}

module.exports = { ViewParseExecController, EXEC_KEY: PARSE_KEY, RENDERER_KEY: VIEW_KEY, VPEUtil }




