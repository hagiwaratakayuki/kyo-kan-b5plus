/**
 * @typedef {import("../../../kyo-kan/context").Context} Context
 */


const RENDERER_KEY = "renderer"
const EXEC_KEY = "exec"
//Kyo-Kan MVC



class StepControllerClass {
    /**
     * @template T
     * @param {*} options 
     * @param {*} commonOptions 
     * @param {*} language 
     * @param {T} functionMap 
     */
    constructor(options, commonOptions, language, functionMap) {


        this.options = options
        this.commonOptions = commonOptions,
            this.language = language
        /**
         * @type {T}
         */
        this.functionMap = functionMap
    }

    /**
     * @param {Context} context
     * @returns {import("../../../kyo-kan/plugin_type").StateResponse}
    */
    in(request, context, stateController) {

        return {
            state: "forwardToSub",
            subkey: "render",
            callback: "afterRender"
        }

    }
    /**
     *  @returns {import("../../../kyo-kan/plugin_type").StateResponse}
    */
    afterRender(request, context, stateController) {
        return {
            state: "wait",
            callback: "acceptRequest"
        }


    }
    /**
     * @returns { import("../../../kyo-kan/plugin_type").StateResponse }
     */

    acceptRequest(request, context, stateController) {
        return {
            state: "forwardToSub",
            callback: "exec"
        }

    }
    /**
     * @returns { import("../../../kyo-kan/plugin_type").StateResponse }
     */

    exec(request, context, stateController) {

    }
}


module.exports = { StepControllerClass, EXEC_KEY, RENDERER_KEY }




