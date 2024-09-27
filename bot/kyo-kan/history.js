const { JSONSerializer } = require('./json_serializer');
/**
 * @typedef {import('./looploader/base_type').LoopStepIndex} LoopStepIndex
 */
class History extends JSONSerializer {

    constructor() {
        super();
        /**
         * @type {import('./history_record').HistoryRecords[]}
         */
        this._histories = [[]];

        this._historyId = 0;
        this._cursor = -1;
        this._index = {}
        /**
         * @type {{[historyId: any]: {fromID:any, nodeId:any}}}
         */
        this._branchStarts = {};
        /**
         * @type {{[historyId: any]: {[pointId: any]: any[]}}}
         */
        this._branchTree = {};
        /**
         * @type {{[historyId:any]: {cursor:any, name:any}[] }}
         */
        this._breakPointsList = {}

    }
    /**
     * 
     * @param {import('./history_record').HistoryRecord} history 
     */
    push(history) {
        const nowHistories = this._getNowHistories();
        nowHistories.push(history);
        this._setNowHistries(nowHistories)



    }
    /**
     * 
     * @param {import('./history_record').HistoryRecord} history 
     */
    _updateHistoryIndex(history) {
        const key = this._getIndexKey(history.loopStepIndex);

        const historyIndex = this._index[this._historyId] || {};
        const stateIndex = historyIndex[key] || {};
        stateIndex[history.state] = this._cursor;
        historyIndex[key] = stateIndex;
        this._index[this._historyId] = historyIndex
    }
    /**
     * 
     * @param {*} loopStepIndex 
     * @param {*} state 
     * @param {*} historyId 
     * @returns {number | null}
     */
    getHistoryCursor(loopStepIndex, state, historyId) {
        const key = this._getIndexKey(loopStepIndex);

        const historyIndex = this._index[historyId || this._historyId] || {};
        const stateIndex = historyIndex[key] || {};
        return state in stateIndex ? stateIndex[state] : null;
    }
    /**
     * @param {LoopStepIndex} loopStepIndex 
     */
    _getIndexKey(loopStepIndex) {
        return loopStepIndex.join('_')
    }
    getHead() {
        const nowHistories = this._getNowHistories();
        return nowHistories[nowHistories.length - 1]
    }
    startBranch(data) {
        const branch = this._getNowHistories().concat([data]);
        this._initBranch(branch);







    }
    _initBranch(branch) {
        this._histories.push(branch);
        const newHistoryId = this._historyId + 1;
        this._branchStarts[newHistoryId] = this._cursor;
        const branchPointsMap = this._branchTree[this._historyId] || {}
        const branchPoints = branchPointsMap[this._cursor] || []
        branchPoints.push(newHistoryId);
        branchPointsMap[this._cursor] = branch
        this._branchTree[this._historyId] = branchPointsMap;
        this._historyId = newHistoryId
    }
    setBreakPoint(name) {
        const breakpoints = this._breakPointsList[this._historyId] || [];
        breakpoints.push({ name, cursor: this._cursor })
        this._breakPointsList[this._historyId] = breakpoints

    }
    getNowHistoryLength() {
        return this._getNowHistories().length
    }
    rewind(move = 1) {
        const nowHistories = this._getNowHistories();
        const backedHistories = nowHistories.slice(0, nowHistories.length - move)
        this._setNowHistries(backedHistories)
        return this.getHead();

    }

    /**
     * 
     * @param {any} name 
     *i @returns {false | any}
     */
    _getBreakpointCursorBack(name) {
        const breakpoints = this._breakPointsList[this._historyId] || [];
        let index = breakpoints.length - 1;
        while (index > -1) {
            const breakpoint = breakpoints[index];
            if (breakpoint.cursor <= this._cursor && breakpoint.name === name) {
                return breakpoint.cursor;
            }
            index--;

        }
        return false;
    }

    _getNowHistories() {
        return this._histories[this._historyId];
    }
    _setNowHistries(histories) {
        this._histories[this._historyId] = histories;
        this._cursor = histories.length - 1;
    }



}
module.exports = { History }