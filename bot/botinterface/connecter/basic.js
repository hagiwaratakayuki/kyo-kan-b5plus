

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
    /**
     * todo resumedataにある程度の型を付ける
     * @template T
     * @param {any} request 
     * @param {*} resumeData
     * @param {T?} resultinit  
     * @returns {Promise<T = Object>}
     */
    async _run(request, resumeData, resultinit) {
        /**
         * @type {import("../types/responsetypes/basic").Messages}
         */
        const messages = await this.controller.run(request, resumeData)
        const result = resultinit || {}
        for (const message of messages || []) {
            await this._call(message, result)


        }
        return result
    }
    /**
     * 
     * @param {import("../types/responsetypes/basic").Message} message 
     */
    async _call(message, result) {
        if (message?.responseType) {
            result = (await this[message.responseType].call(this, message, result)) || result;
        }
        return result
    }

}
module.exports = { Basic }