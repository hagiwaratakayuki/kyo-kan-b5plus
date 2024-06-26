const readlineSync = require('readline-sync');
const { Basic } = require('./basic');
/**
* @typedef { import("../types/responsetypes/basic").Message } message 
* */
class Connector extends Basic {
    async run(jsonData) {
        let callbackMessage = {};
        while (this.controller.isEnd() === false) {
            callbackMessage = await this._run(callbackMessage, jsonData);
        }


    }

    /**
     * 
     * @param {message} message 
     */
    message(message) {
        console.log(message.text)


    }

    /**
    * 
    * @param {message} message
    * @param {import('../types/responsetypes/basic').CallbackMessage} result  
    */
    question(message, result) {
        result.answer = readlineSync.question(message.text)

    }
    /**
    * 
    * @param {message} message
    * @param {import('../types/responsetypes/basic').CallbackMessage} result  
    */
    YN(message, result) {
        result.YN = readlineSync.keyInYNStrict(message.text)
    }
    /**
    * 
    * @param { message } message
    * @param { import('../types/responsetypes/basic').CallbackMessage } result
    */
    selection(message, result) {
        result.selection = readlineSync.keyInSelect(message.selectOptions, message.text);
    }
}


module.exports = { Connector };