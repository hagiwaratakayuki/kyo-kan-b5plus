/**
 * @typedef {import("../../../standized_protocol/responsetypes/basic").ResponseTypeMessage} MessageType
 * 
 * @type {import("../../types/responsehandler").LineResponseMessageHandlerType}
 */
const MessageHook = {
    responseType: "mesage",
    /**
    *
    * @param {import("../../../standized_protocol/responsetypes/basic").StandardizedMessageStateResponse} stateResponse
    */
    exec: function (stateResponse) {
        /**
         * @type {import("@line/bot-sdk").TextMessage}
         */
        const ret = {
            type: "text",
            text: stateResponse.clientResponse.message
        }
        return ret
    }
}
module.exports = { MessageHook }