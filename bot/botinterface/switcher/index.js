const { Loader } = require("../../kyo-kan/looploader/save_and_load");
const { StateController } = require("../../kyo-kan/state_controller");

class Switcher {
    /**
     * 
     * @param {[k: string]:Function} handlers 
     * @param {*} loaderClass 
     * @param {*} controllerClass 
     */
    constructor(handlers, loaderClass = Loader, controllerClass = StateController) {
        this.handlers = handlers
        this.controllerClass = controllerClass
        this.loaderClass = loaderClass
    }
    run(request) {
        const event = this.getEvent(request)
        return this.handleSwitch(event)


    }
    /**
     * @param {string} event 
     */
    async handleSwitch(event, ...args) {
        if (event in this.handlers) {
            return await this.handlers[event].call(this.handlers, this, ...args)

        }
        throw "Event " + event + ' does not exist in handler'

    }
    /**
     * 
     * @param {any} request
     * @returns {string} 
     */
    getEvent(request) {

    }


    /**
     * 
     * 
     * @param {boolean} isStart 
     */
    buildController(builderConfigMap, isStart) {
        /**
         * @type {import("../../kyo-kan/looploader/base_type").BasicLoader}
         */
        const loader = new this.loaderClass(isStart)
        loader.buildersRegistration(builderConfigMap);

        return new this.controllerClass(loader)


    }
    buildAndRunController(request, jsonData, builderConfigMap, isStart) {
        /**
         * @type {StateController}
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

module.exports = { Switcher }