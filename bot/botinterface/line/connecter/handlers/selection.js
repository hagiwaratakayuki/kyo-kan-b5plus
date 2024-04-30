/**
 *
 *
 */
const SelectionHook = {
    responseType: "selection",
    /**
     *
     * @param {import("../../../types/responsetypes/basic").StandardizedSelectionStateResponse} pluginResponse 
     */
    exec: function (pluginResponse) {

        /**
         * @type {import("@line/bot-sdk").TemplateMessage}
         */
        const ret = {
            type: "template",
            altText: pluginResponse.clientResponse.message.slice(0, 400),
            template: {
                type: "buttons",



            }
        }

        let text = pluginResponse.clientResponse.message

        if (!!pluginResponse.clientResponse.title === true) {
            ret.template.title = pluginMessage.response.title.slice(0, 40)
            text = text.slice(0, 60)
        }
        else {
            text = text.slice(0, 60)
        }
        ret.template.text = text
        const actions = pluginResponse.clientResponse.options.map(function (r) {
            /**
             * @type {import("@line/bot-sdk").MessageAction}
             */
            const ret = {
                type: 'message',
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