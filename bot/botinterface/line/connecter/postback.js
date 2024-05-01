const { LineBasicConnector } = require(".")








class LinePostbackConnector extends LineBasicConnector {


    /**
     * 
     * @param {import("@line/bot-sdk").PostbackEvent} lineEvent 
     */
    parseEvent(lineEvent) {

        const message = lineEvent.postback

        return { value: message.data }


    }


}

module.exports = { LinePostbackConnector };