

/**
 *  
 * @typedef { import('../../../kyo-kan/plugin').StateResponse } StateResponse
 * 
 * @typedef { import("../../../kyo-kan/looploader/base_type.d.ts").BuilderCo fig} BuilderConfig
 * @typedef { import("../../../kyo-kan/looploader/save_and_load").Saver } Saver
 * @typedef { { message: string } } MessageOption
 * @typedef { import("../../types/responsetypes/basic").Message } Message
 * @typedef { import("../../types/responsetypes/basic").CallbackMessage } CallbackMessage
 * @typedef { import("../../create_request").CreateRequest <CallbackMessage> } CreateRequest

* */
const name = "example"

/**
 * 
 * @param {Saver} saver 
 */
function createrRegister(saver) {


    saver.builderRegistration(name, {
        builder: builder
    })
}

/**
 * 
 * @param {any} options 
 */
function builder(options) {
    /**
     * @type {import('../kyo-kan/plugin').PlugIn}
     */

    const plugins = {
        /**
         * 
         * @param {CreateRequest} request 
         */
        in: function (request, context, controller) {
            const pluginNames = controller.loader.getSubLoopDocuments('', ["title"]).map(function (r) {
                return r.document.title

            })
            /**
             * @type {StateResponse & Message}
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
        _selection: function () {

        }
        /**
         * 
         * @param {CreateRequest} request
         * @param {any} context
         * @param {import('../kyo-kan/state_controller').StateController} controller
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