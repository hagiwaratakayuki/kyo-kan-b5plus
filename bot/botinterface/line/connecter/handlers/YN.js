
const YNHook = {
    responseType: "YN",
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
                type: "confirm"


            }
        }


        ret.template.text = pluginResponse.clientResponse.title || pluginResponse.clientResponse.message
        const actions = response.options.map(function (r) {
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

module.exports = { YNHook }