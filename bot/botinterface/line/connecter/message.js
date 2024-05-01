const { LineBasicConnector } = require(".")








class LineMessageConnector extends LineBasicConnector {


    /**
     * 
     * @param {import("@line/bot-sdk").WebhookEvent} lineEvent 
     */
    parseEvent(lineEvent) {
        /**
         * @type {import("@line/bot-sdk").EventMessage}
         */
        const message = lineEvent.message
        if (message.type === "text") {
            /**
             * @type {import('../types/request').LineStandardizedRequestText}
             */
            const res = {
                text: lineEvent.text
            }
            return res
        }
        if (message.type === "location") {

            /**
            * @type {import('../types/request').LineStandardizedRequestLocation}
            */
            const res = {
                text: message.title,
                latitude: message.latitude,
                longitude: message.longitude,
                adress: message.address
            }
            return res
        }
        return {}


    }


}

module.exports = { LineMessageConnector };