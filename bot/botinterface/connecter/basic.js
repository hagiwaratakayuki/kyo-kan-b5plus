const { Loader } = require("../../kyo-kan/looploader/save_and_load")
const { StateController } = require("../../kyo-kan/state_controller")


class Basic {
    handlers = {}
    constructor(controllerClass = StateController, loaderClass = Loader) {
        this._controllerClass = controllerClass;
        this._loaderClass = loaderClass

    }
    /**
     * @param {any} request 
     * @param {any} resumeData
     */
    async _run(request, resumeData, builderConfigMap, isStart, language = '', commonOptions = {}, functionMap = {}) {

        const loader = this._buildLoader(builderConfigMap, isStart, language, i18n, commonOptions, functionMap)
        const controller = this._buildController(loader)

        const messages = await controller.run(request, resumeData, isStart)
        const result = await this._processMessages(messages)


        const isEnd = controller.isEnd()
        controller.destroy()
        return result, isEnd
    }
    _processMessages(messages) {
        const proms = []
        for (const message of messages) {
            proms.push(this._call(message))


        }
        return Promise.all(proms)
    }
    /**
     * 
     * @param {import("../standized_protocol/responsetypes/basic").Message} message 
     */
    async _call(message, ...args) {

        const handler = this.handlers[message.responseType]
        if (!handler === true) {
            throw "Response Type " + message.responseType + " does not exist"
        }
        return await handler.exec(message, ...args);






    }
    /**
     * 
     * 
     * @param {boolean} isStart 
     */
    _buildController(loader) {

        return new this._controllerClass(loader)


    }
    _buildLoader(builderConfigMap, isStart, language = '', commonOptions = {}, functionMap = {}) {
        /**
         * @type {import("../../kyo-kan/looploader/base_type").BasicLoader}
         */
        const loader = new this._loaderClass(isStart, language, commonOptions, functionMap)
        loader.buildersRegistration(builderConfigMap);
        return loader
    }


}
module.exports = { Basic }