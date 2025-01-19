
const { BasicSelect } = require("../vpec/controller");

const OPTION_SUBLOOP_NAME = "options"

/**
 * @typedef {import("../protocol").SelectResult} SelectResult
 * */
class PluginSelect extends BasicSelect {
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
            subkey: OPTION_SUBLOOP_NAME,
            subid
        }


    }
}
module.exports = { PluginSelect, OPTION_SUBLOOP_NAME }