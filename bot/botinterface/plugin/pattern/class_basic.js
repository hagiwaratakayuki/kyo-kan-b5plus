class ClassBasicTemplate {
    /**
     * @template T
     * @param {*} options 
     * @param {*} commonOptions 
     * @param {*} language 
     * @param {T} functionMap 
     */
    constructor(options, commonOptions, language, functionMap) {


        this.options = options
        this.commonOptions = commonOptions,
            this.language = language
        /**
         * @type {T}
         */
        this.functionMap = functionMap
    }

}

module.exports = { ClassBasicTemplate }