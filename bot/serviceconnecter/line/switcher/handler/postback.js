

const { LineMessageConnector } = require("../../connecter/message")
const { BasePattern } = require("./class_templates/base_pattern")



class PostbackHandler extends BasePattern {
    connectorClass = LineMessageConnector
}



module.exports = { PostbackHandler } 