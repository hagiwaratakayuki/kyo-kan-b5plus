/**
 * @typedef {import("../../../kyo-kan/context").Context} Context
 */

/**
 * @type {import("../../../kyo-kan/plugin_type").Builder}
 */
function senarioBuilder(options, commonOptions, language, functionMap) {
    return {
        options,
        commonOptions,
        language,
        functionMap,
        /**
         * @param {Context} context
         * @returns {import("../../../kyo-kan/plugin_type").StateResponse}
        */
        in: function (request, context, stateController) {

            return {
                state: "forwardToSub",
                subid: this.options.subid || ''
            }

        },
        /**
         * @param {Context} context
        */
        returnFromSub: function (request, context, stateController) {
            context.setData(context.getSubLoopData())

        }
    }

}