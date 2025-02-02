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

            context.setLoopData({ selection: request.select });





        }
    };
    return plugins;

}

module.exports = { selectParserBuilder }