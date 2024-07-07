

/**
 *  

* */
const name = "select"

/**
 * @param {{id:any}} options 
 * @param {import('../../../../standized_protocol/function_map/basic').StandardizedFunctionMap} functionMap 
 */
function createrBuilder(options, commonOptions, language, functionMap) {

    const ret = {
        'functionMap': functionMap,
        'options': options,
        /**
         * @type {import('../../../../../kyo-kan/protocol').PluginCallbackProtocol}
        */
        in: function (request, context, stateController) {

            const id = options.id
            const messageKey = options.messageKey || "message"

            /**
             * @type {import('../../../../standized_protocol/responsetypes/basic').StandardizedSelectionStateResponse}
             * */
            const ret = {
                state: "wait",
                callback: "select",
                clientResponse: {
                    message: this.functionMap.i18n(language, id, messageKey),
                    title: this.functionMap.i18n(language, id, t)

                }





            };
            return ret;

        },
        /**
         * 
         * @param {CreateRequest} request
         * @param {any} context
         * @param {import('../../../../../kyo-kan/state_controller').StateController} controller
         * @returns {StateResponse}
         */
        select: function (request, context, controller) {



            if (request.input.selection === -1) {
                return;
            }
            /**
             * @type {StateResponse}
             */
            const response = {
                state: "forwardToSub",
                subid: index
            }
            return response


        },
        /**
         * 
         * @param {CreateRequest} request 
         */
        returnFromSub: function (request) {
            /**
            * @type {StateResponse}
            */
            const ret = {
                state: "keep",
                callback: "beforeFinal"

            };
            return ret;

        },
        /**
         * 
         * @param {CreateRequest} request
         * @returns {StateResponse & Message} 
         */
        beforeFinal: function (request) {
            return {
                state: "keep",
                callback: "final",
                responseType: "YN",
                text: 'finish it?'


            }

        },
        /**
         * 
         * @param {CreateRequest} request
         * @returns {StateResponse} 
         */
        final: function (request) {



            if (request.input.YN === true) {
                return {
                    state: "out"
                }
            }
            return {
                state: "keep",
                callback: "in"

            }

        }
    }
    return plugins

}


module.exports = { name, createrRegister }