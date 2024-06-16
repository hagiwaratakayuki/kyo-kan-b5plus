/**
 * @typedef {import("../../../kyo-kan/context").Context} Context
 */

//Kyo-Kan MVC



class StepControllerClass {
    constructor(options, commonOptions, language, functionMap) {


        this.options = options
        this.commonOptions = commonOptions,
            this.language = language
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
}


module.exports = { StepControllerClass }




