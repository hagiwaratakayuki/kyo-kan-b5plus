const { Context } = require('../../../../../kyo-kan/context')


/**
 *  

* */
const name = "SelectView"

/**
 * @param {{id:any}} options 
 * @param {import('../../../../standized_protocol/function_map/basic').StandardizedFunctionMap} functionMap 
 */
function selectViewBuilder(options, commonOptions, language, functionMap) {

    const plugins = {
        'functionMap': functionMap,
        'options': options || {},
        /**
         * @type {import('../../../../../kyo-kan/protocol').PluginCallbackProtocol}
        */
        in: function (request, context, stateController) {

            const messageKey = this.options.messageKey || "message"
            const titleKey = this.options.titleKey || "title"
            const optionsKey = this.options.optionsKey || 'options'
            const loopData = context.getLoopData()
            /**
             * @type {import('../../../../standized_protocol/responsetypes/basic').StandardizedSelectionStateResponse}
             * */
            const ret = {
                clientResponse: {
                    message: loopData[messageKey],
                    title: loopData[titleKey],
                    options: loopData[optionsKey]

                }





            };
            return ret;

        },


    }
    return plugins

}
/**
 * @param {{id:any}} options 
 * @param {import('../../../../standized_protocol/function_map/basic').StandardizedFunctionMap} functionMap 
 */
function selectParserBuilder(options, commonOptions, language, functionMap) {

    const ret = {
        'functionMap': functionMap,
        'options': options,

        /**
         * 
         * @param {import('../../../../standized_protocol/requestype/basic').StandardizedRequestSelect} request
         * @param {import( '../../../../../kyo-kan/context').Context } context
         * @param {import('../../../../../kyo-kan/state_controller').StateController} controller
         * @returns {StateResponse}
         */
        in: function (request, context, controller) {



            if (request.type !== "select" || request.select === (this.options.noSelect || -1)) {
                return;
            }

            context.setLoopData({ selection: request.select })





        }

    }
    return plugins

}




module.exports = { name, selectViewBuilder, selectParserBuilder }