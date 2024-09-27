const { VPEUtil } = require("../../pattern/view_parse_exec/basic");


let REQUIRED_UI = {
    rederes: [],
    parsers: []
}

function setRequiredUI(renderers, parsers) {
    REQUIRED_UI.rederes = renderers;
    REQUIRED_UI.parsers = parsers;
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

function RequiredUI(builderId,) {
    VPEUtil
}

