const express = require('express')
const { middleware } = require('@line/bot-sdk')
const { CHANNEL_SECRET } = require('./secret/line')
/**
 * @type {import('@line/bot-sdk').TextMessage}
 */
const test = {

}
const app = express()
/**
 * @type {import('@line/bot-sdk').MiddlewareConfig}
 */
const config = {
    channelSecret: CHANNEL_SECRET
}

app.post('/webhook', middleware(config), (req, res) => {
    req.body.events // webhook event objects from LINE Platform
    req.body.destination // user ID of the bot

})

app.listen(8080)