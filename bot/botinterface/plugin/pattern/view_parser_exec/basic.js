/**
 * @typedef {import("../../../../kyo-kan/context").Context} Context
 */

const { beforeAfterHook } = require("../../utility/beforeafterhook")
const { ClassBasicTemplate } = require("../class_basic")




const VIEW_KEY = "view"
const PARSE_KEY = "parse"




class ViewParseExecController extends ClassBasicTemplate {

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
 * @param {*} controller
 * @param {LoopStepConfigures} views 
 * @param {LoopStepConfigures} parsers
 * @returns {LoopStepConfigure}
 */
function VPEUtil(controller, views, parsers, options) {
    /**
     * @type {LoopStepConfigure}
     */
    const ret = {
        builder: controller,
        options,
        subLoops: {

        }
    }

    ret.subLoops[VIEW_KEY] = { type: "loop", loopSteps: views }
    ret.subLoops[PARSE_KEY] = { type: "loop", loopSteps: parsers }

    return ret


}
/**
 * 
 * @param {*} controller 
  * @param {LoopStepConfigures} views 
 * @param {LoopStepConfigures} parsers 
 * @param {import("./syncronaizer_ptotocol").beforeAfterHook} viewsHook 
 * @param {import("./syncronaizer_ptotocol").beforeAfterHook} parsersHook 
 * @param {*} options 
 */
function HookedVPEUtil(controller, views, parsers, viewsHook, parsersHook, options) {
    const _views = beforeAfterHook(views, viewsHook)
    const _parsers = beforeAfterHook(parsers, parsersHook)
    return VPEUtil(controller, _views, _parsers, options);
}



module.exports = { ViewParseExecController, PARSE_KEY, VIEW_KEY, VPEUtil, HookedVPEUtil }




