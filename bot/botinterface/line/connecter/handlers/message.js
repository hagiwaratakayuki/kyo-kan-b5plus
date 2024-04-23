/**
 * @typedef {import("../../../types/responsetypes/basic").ResponseTypeMessage} MessageType
 * 
 * @type {import("../../../types/responsetypes/utiltype").ConnectorHooks<MessageType>}
 */
const MessageHook = {
    /**
    *
    * @param {import("../../../types/responsetypes/line").LineMessageStateResponse } stateResponse 
    */
    message(stateResponse) {
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