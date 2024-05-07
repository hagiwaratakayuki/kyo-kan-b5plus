

/**
 *  

* */
const name = "select"

/**
 * 
 * @param {import('../../../standized_protocol/plugin/create').StandardizedCreateFunctionMap} functionMap 
 *  
 */
function createrBuilder(options, commonOptions, language, functionMap) {

    const ret = {
        options,
        commonOptions,
        language,
        functionMap,

        /**
         * @type {import('../../../../kyo-kan/protocol').PluginCallbackProtocol}
        */
        in: function (request, context, stateController) {



            /**
             * @type {Sta}
             */
            const ret = {
                state: "keep",
                callback: "select",
                responseType: "selection",
                text: "select one",
                selectOptions: pluginNames


            };
            return ret;

        },
        /**
         * 
         * @param {CreateRequest} request
         * @param {any} context
         * @param {import('../../../../kyo-kan/state_controller').StateController} controller
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