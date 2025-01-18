
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
/**
 * @this {typeof ClassBasicTemplate & {fuga:string}}
 */
const t = ClassBasicTemplate

class test extends t {
    hoge() {
        /**
         * @type {{fuga:string}}
         */
        const t = this.functionMap

    }
}
module.exports = { ClassBasicTemplate }