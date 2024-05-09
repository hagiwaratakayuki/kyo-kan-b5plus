

const { LineMessageConnector } = require("../../connecter/message")
const { BasePattern } = require("./class_templates/base_pattern")



class MessageHandler extends BasePattern {
    connectorClass = LineMessageConnector
}



module.exports = { MessageHandler } 