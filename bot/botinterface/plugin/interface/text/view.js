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


            /**
             * @type {{options: {value:string, label:string}, title?:string, message?:string }}
             * */
            const loopData = context.getLoopData();

            /**
             * @type {import('../../../../standized_protocol/responsetypes/basic').StandardizedSelectionStateResponse}
             * */
            const ret = {
                clientResponse: {
                    message: loopData.message,
                    title: loopData.title,
                    options: loopData.options
                }
            };
            return ret;

        },
    };
    return plugins;

}

module.exports = { selectViewBuilder }