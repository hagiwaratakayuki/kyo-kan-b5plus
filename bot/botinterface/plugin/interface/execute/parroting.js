const { name } = require('../../parroting');


/**
 *  
 * @typedef { import('../../../kyo-kan/plugin').StateResponse } StateResponse
 * 
 * @typedef import("../../../kyo-kan/looploader/base_type").BuilderConfig
 * @typedef { import("../../kyo-kan/looploader/save_and_load").Saver } Saver
 * @typedef { { message: string } } MessageOption
 * @typedef { import("../../types/responsetypes/basic").Message } Message
 * @typedef { import("../../types/responsetypes/basic").CallbackMessage } CallbackMessage
 * @typedef { import("../../../create_request").CreateRequest <CallbackMessage> } CreateRequest

* /
/**
 *
 * @param {Saver} saver
 */
function createrRegister(saver) {



    saver.builderRegistration(name, {
        builder: createrBuilder,
        documentLoader: {
            title: function () {
                return "parroting";
            }
        }
    });
}
function createrBuilder() {
    return {
        /**
         *
         * @param {CreateRequest} request
         */
        in: function (request) {

            request.saver.addLoopStep(name, {});
            /**
             * @type {Message & StateResponse}
             */
            const response = {
                responseType: "message",
                text: "parroting add",
                state: "out",

            }
            return response


        }
    };

}

module.exports = { name, createrRegister }