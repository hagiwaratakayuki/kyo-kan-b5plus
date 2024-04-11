const { JSONSerializer } = require("../kyo-kan/json_serializer");
const { StateController } = require("../kyo-kan/state_controller");

class Creater extends JSONSerializer {
    /**
     * @param {import("../kyo-kan/looploader/save_and_load").Saver} saver 
     * @param {import("../kyo-kan/looploader/base_type").BasicLoader} loader
     * @param {Function} controllerClass 
     *
     */
    constructor(saver, loader, controllerClass = StateController) {
        super();
        /**
         * @type {StateController}
         */
        this.controller = new StateController(loader)
        this.saver = saver

    }
    run(input, jsonData) {
        const request = {
            request: input,
            saver: this.saver
        }
        return this.controller.run(request, jsonData);
    }
    isEnd() {
        return this.controller.isEnd();
    }

}

module.exports = { Creater }