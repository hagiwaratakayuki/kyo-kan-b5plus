/**
 * @param {{id:any}} options
 * @param {import('../../../../standized_protocol/function_map/basic').StandardizedFunctionMap} functionMap
 */
function standardizedParser(options, commonOptions, language, functionMap) {

    const ret = {
        'functionMap': functionMap,
        'options': options,

        /**
         * @typedef {import('../../../../standized_protocol/requestype/basic').StandardizedRequestSelect} RequestType
         * @param {RequestType | RequestType[]} request
         * @param {import( '../../../../../kyo-kan/context').Context } context
         * @param {import('../../../../../kyo-kan/state_controller').StateController} controller
         * @returns {StateResponse}
         */
        in: function (request, context, controller) {

            if (context.getLoopData().isSingle) {

                if (request.type !== "select" || request.select === (this.options.noSelect || -1)) {
                    return;
                }

                context.setLoopData({ selection: request.value });
            }
            else {
                const loopData = context.getLoopData() || {}

                for (const req of request) {
                    if (req.key == loopData.key) {
                        loopData.value = req.value
                    }
                }
                context.setLoopData(loopData)
            }




        }
    };
    return ret;

}
const STANDARDIZED_REQUEST_PARSER = "StandardizedRequestParser";
module.exports = { standardizedParser, STANDARDIZED_REQUEST_PARSER }