const { History } = require('./history')
const { StateEmitter } = require('./state_emitter')
const { Context } = require('./context');
const { JSONSerializer } = require('./json_serializer');
const merge = require('deepmerge')


/**
 * @typedef {import("./plugin_type").State} State
 * @typedef {import('./plugin_type').MoveHooks} HookNames
 * @typedef {import("./plugin_type").PlugIn} PlugIns
 * @typedef {import('./history_record').HistoryRecord} HistoryRecord
 */
/** 
 * @type {Array<State>}
 */

const stateKeys = ["start", "in", "wait", "forwardOut", "forwardToSub", "returnFromSub", "back", 'break', 'continue']
/**
 * @typedef {onBack | onReturnFromSub | onBreak}
 */

const hooks = ["onBack", "onReturnFromSub", "onBreak"];

/**
 *  @typedef {import("./plugin_type").StateResponse} StateResponse
 */

class StateController extends JSONSerializer {
    /**
     * @typedef {import('./looploader/save_and_load').Loader} BasicLoader 
     * @param {BasicLoader} loader 
     * @param {Function} contextClass  
     * @param {Function} emitterClass
     * @param {Function} historyClass 
     * 
     */
    constructor(loader, contextClass = Context, emitterClass = StateEmitter, historyClass = History) {
        super();
        //TODO シナリオidツリー実装 forward to sub

        this._scenarioIdpath = [0]

        this.isDebug = false
        /**
         * @type {BasicLoader}
         */
        this.loader = loader;

        for (const stateKey of stateKeys) {
            this[stateKey] = this[stateKey].bind(this)
        }
        /**
         * @type {import("./state_emitter").StateEmitter}
         */
        this._emitter = new emitterClass(this)


        /**
         * @type {import("./history").History}
         */
        this._history = new historyClass();




        /**
         * @type {Context}
         */
        this._context = new contextClass(this._history)

        /**
         * @type {Array<string | false>}
         */

        this._callbacks = []




    }

    toJSON() {
        /**
         * @type {Array<keyof StateController>}
         */
        const filters = ['_plugin'];
        return this._toJSON(filters)
    }



    /**
     * @param {any} request
     * @param {any?} resumeData
     */
    run(request, resumeData, isFirst = false) {

        if (resumeData) {
            const _resumeData = isFirst === true ? { loader: resumeData } : resumeData
            this.fromJSON(_resumeData);
            if (isFirst === true) {
                this.loader.resetPosition()
            }
        }

        return this._emitter.run(request)
    }
    destroy() {
        for (const stateKey of stateKeys) {
            this[stateKey] = null
        }
    }
    async start(request) {
        const responses = []
        for (const plugins of this.loader.getStartStep()) {
            const response = await plugins.start(request, this._context);
            if (response) {
                responses.push(response)
            }

        }
        const inResponses = await this._emitter.emit("in", request);
        return responses.concat(inResponses)

    }
    async in(request) {
        let responses = [];
        let now = this.loader.forward();

        this._context.moveLoop()
        const _responses = await this._inProcess(request, now);
        return responses.concat(_responses);



    }
    async wait(request) {
        let responses = []
        const now = this.loader.getNow();


        /**
         * @type {StateResponse}
         */
        const response = await this._call(this._callbacks.pop() || "wait", now, request)
        responses.push(response);

        const _responses = await this._checkState(request, response);
        responses = responses.concat(_responses)

        return responses;
    }
    /**
     * 
     * @param {any} request
     * @param {StateResponse} response  
     
     *  
     * @returns 
     */
    async _checkState(request, response) {
        let responses = [];
        const state = this._emitter.getState();
        if (state !== 'wait') {
            const _responses = await this._emitter.run(request, response)
            responses = responses.concat(_responses)

        }
        return responses
    }

    async forwardOut(request, response) {
        let responses = []
        const now = this.loader.getNow();

        if (now.forwardOut) {
            const _response = await this._call('forwardOut', now, request, response);
            responses.push(_response);
            const state = this._emitter.getState()
            if (state !== 'forwardOut') {
                if (state === "wait") {
                    return responses

                }
                const _responses = await this._emitter.run(request, response);
                return responses.concat(_responses)


            }
        }




        while (this.loader.isLoopEnd() === true && this._emitter.getState() === 'forwardOut' && this.loader.isTopLoop() === false) {
            this.loader.forward()
            let _responses = await this._emitter.emit("returnFromSub", request, response, false);
            responses = responses.concat(_responses);
            let _state = this._emitter.getState();
            if (_state !== 'forwardOut') {
                if (_state === 'wait') {
                    return responses
                }
                const _responses = await this._emitter.run(request, response)
                responses = responses.concat(_responses)
            }


        }
        if (this.isEnd() === false && this._emitter.getState() === 'forwardOut') {

            this._emitter.setState("in")
        }
        if (this._emitter.getState() === "in") {

            const inResponses = await this._emitter.run(request)
            responses = responses.concat(inResponses)
        }



        return responses;
    }
    /**
     * 
     * @param {any} request 
     * @param {StateResponse} response 
     * @returns 
     */
    async forwardToSub(request, response) {

        let responses = []
        let _subLoopInit = response.subLoopInit || {}
        this._context.callback = response.callback;

        this._callbacks.push("callback" in response ? response.callback : false)




        const [isHookExist, hookResponses] = await this._callHookFunction("onForwardToSub", request, response, false);
        for (const hookResponse of hookResponses) {
            if (!!hookResponse.subLoopInit === true) {
                _subLoopInit = Object.assign(_subLoopInit, hookResponse.subLoopInit || {})
            }

        }
        responses = responses.concat(hookResponses)
        if (this._emitter.getState() === "forwardToSub") {
            this._context.subid = response.subid
            this._context.subKey = response.subkey
            const subloopStep = this.loader.forwardToSub(response.subid, response.subkey)
            this._context.forwardToSub(_subLoopInit)
            this._scenarioIdpath.push(this.loader.getLoopStepIndex()[0])
            const _responses = await this._inProcess(request, subloopStep);
            responses = responses.concat(_responses);
        }
        return responses





    }
    /**
     * 
     * @param {any} request 
     * @param {PlugIns} now 
     * @returns 
     */
    async _inProcess(request, now) {
        const response = await this._call("in", now, request)
        const responses = [];

        responses.push(response)
        const _responses = await this._checkState(request, response);


        return responses.concat(_responses)
    }
    /**
     * 
     * @param {*} request 
     * @param {StateResponse} response 
     * @returns 
     */
    async back(request, response) {
        const backIndex = this.loader.getRelativePosition(response.relativeLoopType, response.move)
        const nowIndex = this.loader.getLoopStepIndex()
        if (backIndex[0] !== nowIndex[0]) {

            while (this._scenarioIdpath[this._scenarioIdpath.length - 1] !== backIndex[0]) {
                this._callbacks.pop();
                this._context.returnFromSub();
                this._scenarioIdpath.pop()

            }
        }

        this.loader.setLoopStepIndex(backIndex);
        let responses = [];
        responses.push(response)
        //const [isHookExist, _responses] = await this._callHookFunction("onBack", request, response, false)
        //responses = responses.concat(_responses)




        if (response.isRewindHistry === true) {
            const histryCursur = this._history.getHistoryCursor(backIndex, "in")
            this._history.rewind(histryCursur);

        }
        this._emitter.setState("in");











        return responses.concat((await this._inProcess(request, now)))

    }
    //called from subloop forwardOut
    async returnFromSub(request, response, isAutoForward = true) {

        this._context.returnFromSub(request, response, isAutoForward = isAutoForward);

        return this._subLoopFinishProcess(request, isAutoForward)


    }
    async break(request, response, isAutoForward = true) {
        const stepIndex = this.loader.getRelativePosition("super")
        this._context.subid = this.loader.getSubId()
        this.loader.setLoopStepIndex(stepIndex)
        return this._subLoopFinishProcess(request, response, isAutoForward, ['break'])

    }
    /**
     * 
     * @param {State[]} hookEvents // TODO Move Hookにする
     * @returns 
     */
    async _subLoopFinishProcess(request, response, isAutoForward = true, hookEvents = []) {
        let responses = []
        this._context.subKey = this.loader.getSubKey();
        this._context.subId = this.loader.getSubId()
        this._scenarioIdpath.pop()

        const initState = this._emitter.getState()


        this._context.returnFromSub()
        const now = this.loader.getNow();

        /**
        * @type {string[]}
        */
        const _hookEvents = hookEvents.concat(['returnFromSub'])
        const callback = this._callbacks.pop()
        if (callback !== false) {
            _hookEvents.push(callback)


        }

        for (const hookEvent of _hookEvents) {
            const hookResponse = await this._call(hookEvent, now, request, stateKeys.indexOf(hookEvent) !== -1)
            if (!hookResponse === false) {
                responses.push(hookResponse)
                if (!hookResponse.state === false) {

                    this._emitter.setState(hookResponse.state)
                    if (hookResponse.state === 'wait') {
                        return responses
                    }
                    const hookResponses = await this._emitter.run(request, response, isAutoForward)
                    responses = responses.concat(hookResponses)
                    return responses;

                }
            }
        }
        if (this._emitter.getState() === initState) {
            this._emitter.setState('in')
            const hookResponses = await this._emitter.run(request, response)
            responses = responses.concat(hookResponses)
        }






        return responses







    }
    async callAs(bulderid, options, functionName, request) {
        const plugins = this.loader.buildTarget(bulderid, options)
        return await plugins[functionName].call(plugins, request, this._context, this, ...args)
    }
    async continue(request, response, isAutoForward = true) {
        const stepIndex = this.loader.getRelativePosition("now", "start")
        this.loader.setLoopStepIndex(stepIndex)
        const [isHookExist, responses] = await this._callHookFunction("onContinue", request, response, isAutoForward)
        responses.unshift(response)

    }
    /**
     * 
     * @param {HookNames} hookName 
     * @param {any} request 
     * @param {any} response 
     * @param {boolean} [isAutoForward=true] 
     * @returns {Promise<[isHookExist:boolean, responses[]]>}
     */
    async _callHookFunction(hookName, request, response, isAutoForward = true) {
        let responses = []
        const now = this.loader.getNow();
        const isHookExist = !!now[hookName]
        if (isHookExist === true) {
            const hookResponse = await this._call(hookName, now, request)
            if (hookResponse) {
                responses.push(hookResponse)
            }
            const responseState = this._emitter.getState()
            if (responseState !== hookName && responseState !== "wait") {
                const _responses = await this._emitter.run(request, response, isAutoForward);
                responses = responses.concat(_responses)
            }

        }


        if (isAutoForward === true && this.isEnd() === false && (isHookExist === false || this._emitter.getState() === "forwardOut")) {
            this._emitter.setState("in")

        }
        if (isAutoForward === true && this._emitter.getState() === "in") {
            const inResponses = await this._emitter.run(request)
            responses = responses.concat(inResponses)

        }
        return [isHookExist, responses];


    }
    /**
     * 
     * @param {State | string} funcname
     * @param {[PlugIns, any[]]} plugins 
     * @param {boolean} [isIgnoreNotExist=false] 
     * @param {*} args  
     */
    async _call(funcname, now, request, isIgnoreNotExist = false, args = []) {
        const [plugins, filters] = now
        if (isIgnoreNotExist === true && funcname in plugins === false) {
            return
        }
        let context;
        /**
         * @type {State}
         */
        const callState = stateKeys.indexOf(funcname) === -1 ? this._emitter.getState() : funcname




        /**
         * @type {StateResponse}
         */
        const response = await plugins[funcname].call(plugins, request, this._context, this, ...args)
        if (callState === "wait") {
            const callback = "callback" in response ? response.callback : false
            this._callbacks.push(callback)
        }
        if (this.isDebug === true || callState === "in" || callState === "wait") {
            const context = this._context.toJSON()
            /**
             * @type {HistoryRecord}
             */
            const record = { request, response, context, loopStepIndex: this.loader.getLoopStepIndex(), state: callState }
            this._history.push(record)

        }
        if (callState === "in" || callState === "wait") {
            this._emitter.setState(response.state || "forwardOut");
        }
        return response;

    }
    reset() {
        this._emitter.setState("start")
        this.loader.resetPosition()
    }
    isEnd() {

        return this.loader.positionState.isEnd === true && this._emitter.getState() === "forwardOut";
    }
}

module.exports = { StateController };
/**
 * 
 * @param {*} plugins 
 * @param {Array} filters 
 * @param {*} args 
 */
class Intercepter {
    constructor(plugins, filters, funcname, ...args) {

        this.index = 0;
        this.lenFilters = filters.length
        this.plugins = plugins
        this.funcname = funcname
        this.args = args

    }
    async _next() {

        while (this.index < this.lenFilters) {
            const now = this.plugins[index]
            this.index += 1;
            if (this.funcname in now) {
                return await now[this.funcname].call(now, this._next, ...this.args)
            }
        }

        return await this.plugins[this.funcname].call(this.plugins, ...this.args)
    }
    async exec() {
        const ret = await this._next()
        this._next = null;
        return ret;
    }


}






