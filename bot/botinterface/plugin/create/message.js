

const { name } = require('../message');

/**
 *  
 * @typedef {import('../../../kyo-kan/plugin').StateResponse} StateResponse
 * @typedef {import("../../kyo-kan/plugin").PlugIns} PlugIns
 * @typedef import("../../../kyo-kan/looploader/base_type").BuilderConfig 
 * @typedef {import("../../kyo-kan/looploader/save_and_load").Saver} Saver
 * @typedef {{message:string}} MessageOption
 * @typedef {import("../../connecter/message").Message} Message
 * @typedef {import("../../connecter/message").CallbackMessage} CallbackMessage 
 * @typedef {import("../../create_request").CreateRequest<CallbackMessage} CreateRequest
         
 */

const questionText = "please input message: "
/**
 *
 * @param {Saver} saver
 */
function createrRegister(saver) {
    /**
     * @type {import("../../../kyo-kan/looploader/base_type").BuilderConfig}
     */
    const config = {
        builder: createrBuilder,
        documentLoader: {
            title: function () {
                return "message";
            }
        }
    };

    saver.builderRegistration(name, config);
}/**
 *
 * @param {CreaterRequest} request
 */
function createrBuilder() {
    return {
        in: function (request) {
            /**
             * @type {Message & StateResponse}
             */
            const response = {
                responseType: "question",
                text: questionText,
                state: "keep",
                callback: "answer"
            }
            return response
        },
        /**
         * 
         * @param {CreateRequest} request 
         */
        answer: function (request) {
            if (!request.input.answer) {
                /**
                * @type {Message & StateResponse}
                */
                const response = {
                    responseType: "question",
                    text: questionText,
                    state: "keep",
                    callback: "answer"
                }
                return response

            }
            /**
             * @type {MessageOption}
             */
            const options = { message: request.input.answer };
            request.saver.addLoopStep(name, options);
        }
    };

}
module.exports = { name, createrRegister }
