/**
 * @typedef {import("../../../types/responsetypes/basic").ResponseTypeSelection} SelectionType
 * 
 * @type {import("../../../types/responsetypes/utiltype").ConnectorHooks<SelectionType>}
 */
const SelectionHook = {
    /**
     *
     * @param {import("../../../types/responsetypes/line").LineSelectionPluginResponse } pluginResponse 
     */
    selection(pluginResponse) {
        /**
         * @type {import("@line/bot-sdk").TemplateMessage}
         */
        const ret = {
            type: "template",
            altText: pluginResponse.response.altText.slice(0, 400),
            template: {
                type: "buttons"


            }
        }
        /**
         * @type {import("../../../types/responsetypes/line").LineSelectionResponseType}
         */
        const response = pluginResponse.response.
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
             * @type {import("@line/bot-sdk").Action}
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