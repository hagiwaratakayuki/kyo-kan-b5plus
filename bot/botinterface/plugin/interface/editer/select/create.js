

const name = "select.create"

/**
 * 
 * @param {import('../../../../standized_protocol/plugin/create').StandardizedCreateFunctionMap} functionMap 
 *  
 */
function createrBuilder(options, commonOptions, language, functionMap) {

    const plugins = {
        options,
        commonOptions,
        language,
        functionMap,

        /**
         * @type {import('../../../../../kyo-kan/protocol').PluginCallbackProtocol}
        */
        in: function (request, context, stateController) {
            return this._selectOrCancel()

        },


        _selectOrCancel: function () {



            /**
             * @type {import('../../../../standized_protocol/responsetypes/basic').StandardizedSelectionStateResponse}
             */
            const ret = {
                state: "wait",
                callback: "select",
                clientResponse: {
                    title: functionMap.i18n("title", language, this.options),
                    message: functionMap.i18n("message", language, this.options),
                    options: [
                        {
                            label: functionMap.i18n("plugin.select", language, this.options),
                            value: "plugin"
                        },
                        {
                            label: functionMap.i18n("scenario.select", language, this.options),
                            value: "scenario"

                        },
                        {
                            label: functionMap.i18n("cancel", language, this.options),
                            value: "cancel"

                        },
                        {
                            label: functionMap.i18n("cancel", language, this.options),
                            value: "save"

                        },
                    ]

                }


            };
            return ret;

        },

        /**
         * @param {import('../../../../standized_protocol/requestype/basic').StandardizedRequestText} request
        */
        select: function (request, context, stateController) {


            switch (request.text) {
                case "plugin":

                    break;

                case "scenario":


                default:
                    break;
            }








        },
        _add

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