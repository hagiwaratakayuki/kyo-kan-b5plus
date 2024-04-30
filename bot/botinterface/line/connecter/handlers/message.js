/**
 * @typedef {import("../../../types/responsetypes/basic").ResponseTypeMessage} MessageType
 * 
 * @type {import("../../types/responsehandler").LineResponseMessageHandlerType}
 */
const MessageHook = {
    responseType: "mesage",
    /**
    *
    * @param { } stateResponse 
    */
    exec: function (stateResponse) {
        /**
         * @type {import("@line/bot-sdk").TextMessage}
         */
        const ret = {
            type: "text",
            text: stateResponse.response.text
        }
        return ret
    }
}
module.exports = { MessageHook }