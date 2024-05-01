
const { MessageHandler } = require("./message")
const { PostbackHandler } = require("./postback")

module.exports.Handlers = {
    "message": MessageHandler,
    "postback": PostbackHandler
}