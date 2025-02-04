const { Context } = require("../../../../../kyo-kan/context");

const { StandardizedFormViewBasic } = require("../../form/view/standardized");

/**
 * 
 * @extends StandardizedFormViewBasic<any, any>
 */
class StanderdizedTextInputResponse extends StandardizedFormViewBasic {
    /**
     * 
     * @param {*} request 
     * @param {Context<any, any, import("../protocol").Configuration, any>} context 
     * @param {*} stateController 
     */
    in(request, context, stateController) {
        const ret = super.in(request, context, stateController);

        /**
         * @type {import("../../../../standized_protocol/responsetypes/basic").StandrazedTextInputResponse}
         */
        const clientResponse = ret.clientResponse

        clientResponse.isTextArea = context.getLoopData().isTextArea
        const placeHolder = context.getLoopData().placeHolder
        if (placeHolder) {
            clientResponse.placeHolder = placeHolder
        }
        return ret;

    }
}
module.exports = { StanderdizedTextInputResponse }