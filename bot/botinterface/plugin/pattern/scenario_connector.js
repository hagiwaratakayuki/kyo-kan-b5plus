const { ClassBasicTemplate } = require("./class_basic");

const EXEC_SUBLOOP_NAME = "exec";


class ScenarioConnector extends ClassBasicTemplate {
    subloop = EXEC_SUBLOOP_NAME;

    /**
   * @param {Context} context
   * @returns {import("../../../../kyo-kan/plugin_type").StateResponse}
  */
    in(request, context, stateController) {

        return {
            state: "forwardToSub",
            subkey: this.subloop,
            callback: "afterRender"


        }
    }

}

}
/**
 * 
 * @typedef {import("../../../kyo-kan/loopsceinario_configure/configure_type").LoopStepConfigure} LoopStepConfigure
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


    ret.subLoops[EXEC_KEY] = { type: "loop", loopSteps: execs }
    return ret


}

module.exports = { ViewParseExecTemplate, EXEC_KEY, RENDERER_KEY, VPEUtil }