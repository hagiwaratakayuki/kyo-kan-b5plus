

const { ClassBasicTemplate } = require("../pattern/class_basic")
const { ViewParseExecController } = require("../pattern/view_parser_exec/basic")
/**
 * @typedef {{saver:import("../../../kyo-kan/looploader/save_and_load").Saver}} FunctionMap
 */
class BasicVPCEditer extends ViewParseExecController {
    /**
     * @type {FunctionMap?}
     */
    functionMap = null

}

class BasicEditer extends ClassBasicTemplate {
    /**
     * @type {FunctionMap} 
     * 
     */
    functionMap = null
}

module.exports = { BasicVPCEditer, BasicEditer }