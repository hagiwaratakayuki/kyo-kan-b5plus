const { PIPELINE_LOOP, PipeLine } = require("./plugin")

/**
 * 
 * @typedef {import("../../../../kyo-kan/loopsceinario_configure/configure_type").LoopStepConfigure} LoopStepConfigure
 * @typedef {LoopStepConfigure[]} LoopStepConfigures
 * @param {*} builder
 * @param {LoopStepConfigures} initialaizers 
 * @param {LoopStepConfigures} execs
 * @returns {LoopStepConfigure}
 */
function PipeLine(steps) {
    /**
     * @type {LoopStepConfigure}
     */
    const ret = {
        builder: "pipeline",
        options,
        subLoops: {

        }
    }

    ret.subLoops[PIPELINE_LOOP] = { type: "loop", loopSteps: initialaizers }

    return ret


}