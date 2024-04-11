

class Basic {
    /**
     * @typedef {import("../../kyo-kan/state_controller").StateController} Controller 
     * @param {Controller} controller
     */
    constructor(controller) {
        /**
         * @type {Controller}
         */
        this.controller = controller
    }
    async _run(...args) {
        /**
         * @type {import("./message").Messages}
         */
        const messages = await this.controller.run(...args)
        let result = {};
        for (const message of messages || []) {
            if (message?.responseType) {
                result = (await this[message.responseType].call(this, message, result)) || result;
            }


        }
        return result
    }
}
module.exports = { Basic }