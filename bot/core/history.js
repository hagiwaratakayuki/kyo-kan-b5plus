const { JSONSerializer } = require('./json_serializer');

class History extends JSONSerializer {

    constructor() {
        super();
        this._histories = [[]];
        this._historyId = 0;
        this._cursor = -1;
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
    push(history) {
        const nowHistories = this._getNowHistories();
        nowHistories.push(history);
        this._setNowHistries(nowHistories)


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
    back(move = 1) {
        const nowHistories = this._getNowHistories();
        const backedHistories = nowHistories.slice(0, nowHistories.length - move)
        this._setNowHistries(backedHistories)
        return this.getHead();

    }
    /**
     * 
     * @param {any} name 
     * @returns {false | any}
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
        this._cursor = histories.length
    }



}
module.exports = { History }