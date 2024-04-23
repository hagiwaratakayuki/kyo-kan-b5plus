/**
 * 
 * @type {import("./line").LinePlugIns}
 */
const Message = {
    in: function (request, context, stateController) {
        /**
         * @type {import("@line/bot-sdk").TextMessage}
         */
        const response = {
            type: "text",


        }
        const message = this._generateMessage(request, context, stateController)
    },
    /**
     * 
     * @type {import("./line").LineRequestCallbackProtocol<string>} 
     */
    _generateMessage: function (request, context, statetController) {

    }

}