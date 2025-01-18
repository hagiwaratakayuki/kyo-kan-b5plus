
const deepmerge = require('deepmerge');
const { JSONSerializer } = require('./json_serializer')
/**
 * @template Data, SubLoopData, LoopData, GlobalData
 * 
*/
class Context extends JSONSerializer {
    /**
     * @typedef {import('./history').History} History
     * @param {History} history 
     */
    constructor(history) {
        super();

        /**
         * @type {GlobalData}
         */
        this._globalData = null

        /**
         * @type {SubLoopData?}
         */

        this._subLoopData = undefined
        this._loopDatas = [{}]
        this._datas = []
        /**
         * @type {History}
         */
        this.history = history;
        this.subKey = null;
        this.callback = null;

    }
    toJSON() {
        /**
         * @type {Array<keyof Context>} 
         * 
         */
        const filter = ['history', 'data'];
        return this._toJSON(filter);
    }
    fromJSON(jsonData) {
        super.fromJSON(jsonData);
        this.data = this._datas[this._datas.length - 1]
    }

    /**
     * 
     * @param {any?} loopData 
     */
    forwardToSub(loopData) {
        this._loopDatas.push(loopData || {})
        this._subLoopData = null

        this._datas.push({})
    }
    returnFromSub() {
        this._subLoopData = this._loopDatas.pop()
        this._datas.pop()

    }


    moveLoop() {

        this.setData({})
        this._subLoopData = null
    }

    getGlobalData() {
        return this._globalData
    }
    setGlobalData(data) {
        this._globalData = data;
    }
    /**
     * 
     * @returns {Data}
     */
    getData() {
        return this._datas[this._datas.length - 1]
    }
    setData(data) {
        this._datas[this._datas.length - 1] = data
    }
    /**
     * 
     * @returns {LoopData}
     */
    getLoopData() {
        return this._loopDatas[this._loopDatas.length - 1]
    }
    setLoopData(data) {
        this._loopDatas[this._loopDatas.length - 1] = data
    }
    updateLoopData(data) {
        this._loopDatas[this._loopDatas.length - 1] = deepmerge(this._loopDatas[this._loopDatas.length - 1], data)


    }
    /**
     * 
     * @returns {SubLoopData}
     */
    getSubLoopData() {
        return this._subLoopData
    }


}

module.exports = { Context }