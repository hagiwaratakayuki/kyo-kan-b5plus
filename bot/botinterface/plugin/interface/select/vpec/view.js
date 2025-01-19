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

            const messageKey = this.options.messageKey || "message";
            const titleKey = this.options.titleKey || "title";
            /**
             * @type {{options: {value:string, label:string} }}
             * */
            const loopData = context.getLoopData();

            /**
             * @type {import('../../../../standized_protocol/responsetypes/basic').StandardizedSelectionStateResponse}
             * */
            const ret = {
                clientResponse: {
                    message: loopData[messageKey],
                    title: loopData[titleKey],
                    options: loopData.options
                }
            };
            return ret;

        },
    };
    return plugins;

}

module.exports = { selectViewBuilder }