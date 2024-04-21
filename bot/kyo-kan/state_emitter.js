/**
 * @typedef {"start" | "in" | "wait" | "forwardOut" | "forwardToSub" | "returnFromSub" |  "break" | "cancel" | "back" | "continue"} State
 * @typedef {{[stateKey in State]: (data:any) => void }} stateCallbacks
 */

const { JSONSerializer } = require("./json_serializer");

class StateEmitter extends JSONSerializer {
    /**
     * @param  {stateCallbacks} callbacks
     */
    constructor(callbacks, state) {
        super();
        /**
         * @type {State}
         */
        this._state = "start";

        this._callbacks = callbacks;


    }

    /**
     * 
     * @param {State} state 
     * @param {any[]} args
     * @returns {Promise<any>} 
     */
    emit(state, ...args) {
        return this._callbacks[state](...args);


    }
    run(...args) {
        return this.emit(this._state, ...args)
    }
    toJSON() {
        /**
         * @type {Array<keyof StateEmitter>}
         */
        const filters = ['_callbacks'];
        return this._toJSON(filters);
    }

    /**
     * 
     * @param {State?} state 
     */
    setState(state) {
        this._state = state || "forwardOut";
    }
    getState() {
        return this._state;
    }

}

module.exports = { StateEmitter }