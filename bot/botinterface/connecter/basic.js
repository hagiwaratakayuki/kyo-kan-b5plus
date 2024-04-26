const { Loader } = require("../../kyo-kan/looploader/save_and_load")
const { StateController } = require("../../kyo-kan/state_controller")


class Basic {
    constructor(controllerClass = StateController, loaderClass = Loader) {
        this._controllerClass = controllerClass;
        this._loaderClass = loaderClass

    }
    /**
     * todo resumedataにある程度の型を付ける
     * @template T
     * @param {any} request 
     * @param {any} resumeData
     
     * @param {T?} resultinit  
     * @returns {Promise<T = Object>}
     */
    async _run(request, resumeData, isStart = false, resultinit = null) {
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
    /**
     * 
     * 
     * @param {boolean} isStart 
     */
    buildController(builderConfigMap, isStart, language = '', commonOptions = {}, functionMap = {}, controllerClass = StateController, loaderClass = Loader) {
        /**
         * @type {import("../../kyo-kan/looploader/base_type").BasicLoader}
         */
        const loader = new loaderClass(isStart, language, commonOptions, functionMap)
        loader.buildersRegistration(builderConfigMap);

        return new controllerClass(loader)


    }
    buildAndRunController(builderConfigMap, isStart, jsonData, language = '', commonOptions = {}, functionMap = {}) {

        /**
         * @type {StateControllerController}
         */
        const controller = this.buildController(builderConfigMap, isStart)
        let _jsonData = {}
        if (isStart === true) {
            _jsonData.loader = jsonData
        }
        else {
            _jsonData = jsonData
        }
        return controller.run(request, jsonData)

    }

}
module.exports = { Basic }