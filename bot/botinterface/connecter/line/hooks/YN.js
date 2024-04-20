/**
 * @typedef {import("../../../types/responsetypes/basic").ResponseTypeYN} SelectionType
 * 
 * @type {import("../../../types/responsetypes/utiltype").ConnectorHooks<SelectionType>}
 */
const SelectionHook = {
    /**
     *
     * @param {import("../../../types/responsetypes/line").LineSelectionPluginResponse } pluginResponse 
     */
    YN(pluginResponse) {
        /**
         * @type {import("@line/bot-sdk").TemplateMessage}
         */
        const ret = {
            type: "template",
            altText: pluginResponse.response.altText.slice(0, 400),
            template: {
                type: "confirm"


            }
        }
        /**
         * @type {import("../../../types/responsetypes/line").LineSelectionResponseType}
         */
        const response = pluginResponse.response.responsType
        let text = response.text


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