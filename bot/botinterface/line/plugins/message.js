/**
 * 
 * @type {import("../types/plugin").LinePlugInsProtocol}
 */
const Message = {
    /**
     *  @type {import("../types/plugin").LineMessageResponseCallbackProtocol} 
      
    */
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
     * @type {import("../types/plugin").LineMessageResponseCallbackProtocol} 
     */
    _generateMessage: function (request, context, statetController) {

    }

}