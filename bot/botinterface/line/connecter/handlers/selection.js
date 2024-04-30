/**
 * @typedef {import("../../../types/responsetypes/basic").StandardizedResponseTypeSelection} SelectionType
 * 
 * @type {import("../../types/responsehandler").LineResponseMessageHandlerType}
 */
const SelectionHook = {
    responseType: "selection",
    /**
     *
     * @param {import("../../../types/responsetypes/basic").StandardizedSelectionResponse } pluginResponse 
     */
    exec: function (pluginResponse) {
        /**
         * @type {import("@line/bot-sdk").TemplateMessage}
         */
        const ret = {
            type: "template",
            altText: pluginResponse.message.slice(0, 400),
            template: {
                type: "buttons",



            }
        }
        /**
         * @type {import("../../../types/responsetypes/line").LineSelectionResponseType}
         */
        const response = pluginResponse.response
        let text = response.text

        if (!!response.title === true) {
            ret.template.title = pluginMessage.response.title.slice(0, 40)
            text = text.slice(0, 60)
        }
        else {
            text = text.slice(0, 60)
        }
        ret.template.text = text
        const actions = response.options.map(function (r) {
            /**
             * @type {import("@line/bot-sdk").PostbackAction}
             */
            const ret = {
                type: 'postback',
                label: r.label,
                text: r.value
            }
            return ret
        })
        ret.template.actions = actions
        return ret;



    }
}

module.exports = { SelectionHook }