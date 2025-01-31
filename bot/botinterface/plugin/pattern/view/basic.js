
const { ClassBasicTemplate } = require("../class_basic")
const { BuilderIdConfigure } = require("../configure/builderconfigure")



/**
 * @type {import("./protocol").ViewString}
 */
const VIEW_KEY = "view"

/**
 * @type {import("./protocol").ControllerString}
 */

const CONTROLLER_KEY = "cotroller"

class ViewPatternController extends ClassBasicTemplate {

    /**
     * @param {Context} context
     * @returns {import("../../../../kyo-kan/plugin_type").StateResponse<any, ViewPatternController>}
    */
    in(request, context, stateController) {

        return {
            state: "forwardToSub",
            subkey: VIEW_KEY,
            callback: "onRequest"
        }

    }
    /**
     *  @returns {import("../../../../kyo-kan/plugin_type").StateResponse}
    */
    onRequest(request, context, stateController) {
        // needs implemens


    }
}
/**
 * @typedef {import("./protocol").ViewPatternBuilderIdMap} ViewPatternBuilderIdMap
 */
class LoopStepGenerater {
    /**
     * 
     * @param {BuilderIdConfigure<ViewPatternBuilderIdMap>} builderIdConfigure 
     */
    constructor(builderIdConfigure) {
        this._builderIdConfigure = builderIdConfigure

    }

    genarate(options) {
        /**
         * @type {import("../../../../kyo-kan/loopsceinario_configure/configure_type").LoopStepConfigure}
         */
        const ret = {
            builder: this._builderIdConfigure.get(CONTROLLER_KEY),
            options: options,
            subLoops: {}

        }
        ret.subLoops[VIEW_KEY] = this._builderIdConfigure.get(VIEW_KEY)

    }
}


module.exports = { ViewPatternController, VIEW_KEY, CONTROLLER_KEY }