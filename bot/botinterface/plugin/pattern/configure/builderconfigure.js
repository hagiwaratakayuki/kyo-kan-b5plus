const deepmerge = require("deepmerge")

/**
 * @template T
 */
class BuilderIdConfigure {

    _buildeIdMap = null
    /**
     * 
     * @param {T} defualtBuilderIdMap 
     */
    constructor(defualtBuilderIdMap) {
        /**
         * @type {T}
        */
        this._buildeIdMap = defualtBuilderIdMap
    }
    /**
     * 
     * @param {keyof T?} key 
     * @returns 
     */
    get(key) {
        if (typeof key != 'undefined') {
            return this._buildeIdMap[key]
        }
        return this._buildeIdMap
    }
    /**
     * 
     * @param {Partial<T>} builderIdMap 
     */
    update(builderIdMap) {
        this._buildeIdMap = deepmerge(this._buildeIdMap, builderIdMap)
    }
}

module.exports = { BuilderIdConfigure }