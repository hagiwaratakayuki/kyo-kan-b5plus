
class ClassBasicTemplate {
    /**
     * 
     * @param {*} options 
     * @param {*} commonOptions 
     * @param {*} language 
     * @param {import("../../../kyo-kan/plugin_type").FunctionMap} functionMap 
     */
    constructor(options, commonOptions, language, functionMap) {


        this.options = options
        this.commonOptions = commonOptions;
        this.language = language
        /**
         * @property {import("../../../kyo-kan/plugin_type").FunctionMap}
         */
        this.functionMap = functionMap
    }

}

module.exports = { ClassBasicTemplate }