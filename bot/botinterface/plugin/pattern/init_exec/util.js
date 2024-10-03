const { InitiaraizeLoop, ExecLoop } = require("./const")

/**
 * View Parse Exec Pattern
 * @typedef {import("../../../../kyo-kan/loopsceinario_configure/configure_type").LoopStepConfigure} LoopStepConfigure
 * @typedef {LoopStepConfigure[]} LoopStepConfigures
 * @param {*} builder
 * @param {LoopStepConfigures} initialaizers 
 * @param {LoopStepConfigures} execs
 * @returns {LoopStepConfigure}
 */
function InitExecUtil(builder, initialaizers, execs, options) {
    /**
     * @type {LoopStepConfigure}
     */
    const ret = {
        builder,
        options,
        subLoops: {

        }
    }

    ret.subLoops[InitiaraizeLoop] = { type: "loop", loopSteps: initialaizers }
    ret.subLoops[ExecLoop] = { type: "loop", loopSteps: execs }
    return ret


}