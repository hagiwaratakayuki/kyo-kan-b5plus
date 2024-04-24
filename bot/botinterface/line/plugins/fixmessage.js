/**
 * 
 * @type {import("../types/plugin").LinePlugInsProtocol}
 */
const FixMessage = {
    /**
     *  @type {import("../types/plugin").LineMessageResponseCallbackProtocol} 
      
    */
    in: function (request, context, stateController) {

        const message = this._generateMessage(request, context, stateController)
        return {
            state:
        }
    },
    /**
     * 
     * @type {import("../types/plugin").LineMessageResponseCallbackProtocol} 
     */
    _generateMessage: function (request, context, statetController) {

    }

}
/**
 * @type {import("../../../kyo-kan/protocol").PlugInBuilderProtocol}
 */
function builder() {

}