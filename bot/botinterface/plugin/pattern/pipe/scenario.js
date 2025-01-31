const { PIPELINE_LOOP, PipeLine } = require("./plugin")

/**
 * 
 * @typedef {import("../../../../kyo-kan/loopsceinario_configure/configure_type").LoopStepConfigure} LoopStepConfigure
 * @typedef {LoopStepConfigure[]} LoopStepConfigures

 * @param {LoopStepConfigures} loopSteps
 * @returns {LoopStepConfigure}
 */
function PipeLine(loopSteps) {
    /**
     * @type {LoopStepConfigure}
     */
    const ret = {
        builder: "pipeline",
        options,
        subLoops: {

        }
    }

    ret.subLoops[PIPELINE_LOOP] = { type: "loop", loopSteps }

    return ret


}