
/**
 * @template functionMapType, optionType
 */
class ClassBasicTemplate {
    /**
     * 
     * @param {optionType} options 
     * @param {*} commonOptions 
     * @param {*} language 
     * @param {import("../../../kyo-kan/plugin_type").FunctionMap & functionMapType} functionMap 
     */
    constructor(options, commonOptions, language, functionMap) {


        this.options = options
        this.commonOptions = commonOptions;
        this.language = language

        this.functionMap = functionMap
    }

}

module.exports = { ClassBasicTemplate }