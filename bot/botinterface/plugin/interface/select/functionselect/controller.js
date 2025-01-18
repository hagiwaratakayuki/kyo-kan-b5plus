
const { BasicSelect } = require("../vpec/controller");

const FUNTION_SUBLOOP_NAME = "functions"

/**
 * @typedef {import("../protocol").SelectResult} SelectResult
 * */
class FunctionSelect extends BasicSelect {
    /**
     * 
     * @param {*} request 
     * @param {import("../../../../../kyo-kan/context").Context<any, SelectResult,any,any>} context 
     * @param {*} stateController
     * @returns {import("../../../../../kyo-kan/plugin_type").StateResponse} 
     */
    exec(request, context, stateController) {
        /**
         * @type {import("../protocol").Options}
         */
        const options = this.options
        const subid = options.selects.indexOf(context.getSubLoopData().selection)

        return {
            state: 'forwardToSub',
            subkey: FUNTION_SUBLOOP_NAME,
            subid
        }


    }
}
module.exports = { FunctionSelect }