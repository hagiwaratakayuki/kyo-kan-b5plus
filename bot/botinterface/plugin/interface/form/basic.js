/**
 * @typedef {import("./protocol").RenderingMode} RenderingMode
 * @typedef {import("../../../../kyo-kan/context").Context} Context
 * 
 */


const { ClassBasicTemplate } = require("../class_basic")




const COMPONENTS_KEY = "components"
const FORM_BUILDER_ID = "form"



/**
 * @extends ClassBasicTemplate<import("../view_parser_exec/protocol").VPEFunctionMap, import("../view_parser_exec/protocol").VPEOptions>
 */
class Form extends ClassBasicTemplate {
    /**
     * @param {*} request 
     * @param {} context
     * @param {*} stateController 
    * @returns { import("../../../../kyo-kan/plugin_type").StateResponse < any, Form, RenderingMode >}
    */
    in(request, context, stateController) {

        return {
            state: "forwardToSub",
            subkey: COMPONENTS_KEY,
            callback: "afterRender",
            subLoopInit: {
                mode: "view"
            }
        }

    }
    /**
    * @param {Context } context
   * @returns { import("../../../../kyo-kan/plugin_type").StateResponse < any, Form >}
   */
    afterRender(request, context, stateController) {
        return {
            state: "wait",
            callback: "parse"
        }

    }
    /**
     * @param {*} request
     * @param {Context<any,  RenderingMode>} context  
     * @param {*} stateController 
    * @returns { import("../../../../kyo-kan/plugin_type").StateResponse < any, Form, RenderingMode >}}
     */
    parse(request, context, stateController) {
        return {
            state: "forwardToSub",
            callback: "afterParse",
            subkey: COMPONENTS_KEY,
            subLoopInit: {
                mode: "parse"
            }
        }

    }
    /**
     * 
     * @param {*} request 
     * @param {import("./protocol").ParseContext} context 
     * @param {*} stateController
     * @returns { import("../../../../kyo-kan/plugin_type").StateResponse} 
     */
    afterParse(request, context, stateController) {
        /**
         * @type {import("./protocol").FormInputsData}
         */
        const loopData = { inputs: context.getSubLoopData() }
        context.setLoopData(loopData)
        return {
            state: "forwardOut"
        }

    }

}


/**
 * 
 * @param {import("../../../../kyo-kan/loopsceinario_configure/configure_type").LoopStepConfigure[]} components 
 * @returns 
 */
function formScenarioStep(components) {
    /**
     * @type {import("../../../../kyo-kan/loopsceinario_configure/configure_type").LoopStepConfigure}
     */
    const ret = {
        builder: FORM_BUILDER_ID,
        options: {},
        subLoops: {}
    }
    ret.subLoops[COMPONENTS_KEY] = components
    return ret;

}

module.exports = { Form, FORM_BUILDER_ID, formScenarioStep }