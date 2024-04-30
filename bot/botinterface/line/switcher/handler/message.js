
const { LineConnector } = require("../../connecter")
const { BasePattern } = require("./class_templates/base_pattern")



class MessageHandler extends BasePattern {
    connectorClass = LineConnector
}



module.exports = { MessageHandler } 