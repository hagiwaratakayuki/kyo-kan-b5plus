const { Loader } = require("../../kyo-kan/looploader/save_and_load")
const { StateController } = require("../../kyo-kan/state_controller")

// TODO change to class execute style
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

        const loader = this._buildLoader(builderConfigMap, isStart, language, commonOptions, functionMap)
        const controller = this._buildController(loader)

        /**
         * @type {import("../types/responsetypes/basic").Messages}
         */
        const messages = await controller.run(request, resumeData, isStart)
        const result = await this._processMessages(messages)


        const isEnd = controller.isEnd()
        controller.destroy()
        return result, isEnd
    }
    async _processMessages(messages) {
        const result = []
        for (const message of messages) {
            result.push((await this._call(message, result)))


        }
        return result
    }
    /**
     * 
     * @param {import("../types/responsetypes/basic").Message} message 
     */
    async _call(message, result) {

        const handler = this.handlers[message.responseType]
        if (!handler === true) {
            throw "Response Type " + message.responseType + " does not exist"
        }
        return await handler.exec(message, result);





        return result
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