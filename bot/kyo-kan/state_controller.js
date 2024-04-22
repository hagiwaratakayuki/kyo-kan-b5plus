const { History } = require('./history')
const { StateEmitter } = require('./state_emitter')
const { Context } = require('./context');
const { JSONSerializer } = require('./json_serializer');
const merge = require('deepmerge')


/**
 * @typedef {import("./state_emitter").State} State
 * @typedef {import("./plugin_type").PlugIn} PlugIns
 * @typedef {{ request:any, response:any, context:any, loopStepIndex:any, state:State }} HistoryRecord
 */
/** 
 * @type {Array<State>}
 */

const stateKeys = ["start", "in", "wait", "forwardOut", "forwardToSub", "returnFromSub", "back", 'break', 'continue']


/**
 *  @typedef {import("./plugin_type").StateResponse} StateResponse
 */

class StateController extends JSONSerializer {
    /**
     * @typedef {import('./looploader/base_type').BasicLoader} BasicLoader
     * @param {BasicLoader} loader 
     * @param {Function} contextClass  
     * @param {Function} emitterClass
     * @param {Function} historyClass 
     * 
     */
    constructor(loader, contextClass = Context, emitterClass = StateEmitter, historyClass = History) {
        super();
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
    run(request, resumeData) {
        if (resumeData) {
            this.fromJSON(resumeData);
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
         * @type {{response:StateResponse}}
         */
        const { response: headResponse } = this._history.getHead()

        /**
         * @type {StateResponse}
         */
        const response = await this._call(headResponse.callback || "wait", now, request)
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



        while (this.loader.positionState.isSubLoopEnd === true && this._emitter.getState() === 'forwardOut' && this.loader.isTopLoop() === false) {
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
        this._context.callback = response.callback
        const hookResponses = await this._callHookFunction("forwardToSub", request, response, false);
        for (const hookResponse of hookResponses) {
            if (!!hookResponse.subLoopInit === true) {
                _subLoopInit = Object.assign(_subLoopInit, hookResponse.subLoopInit || {})
            }

        }
        responses = responses.concat(hookResponses)
        if (this._emitter.getState() === "forwardToSub") {
            const subloopStep = this.loader.forwardToSub(response.subid, response.subkey)
            this._context.forwardToSub(_subLoopInit)
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
    async returnFromSub(request, response, isAutoForward = true) {

        this._context.subKey = this.loader.getSubKey();
        this._context.returnFromSub();


        return this._callHookFunction("returnFromSub", request, response, isAutoForward);


    }
    async back(request, response) {
        const stepIndex = this.loader.getRelativePosition("now", -1)
        this.loader.setStepIndex(stepIndex)
        const responses = await this._callHookFunction("back", request, response, false)
        if (this._emitter.getState() === "back") {
            /**
             * @type {import('./plugin_type').BackTarget}
             */
            //let backTarget = "in";

            const limit = this._history.getNowHistoryLength() - 1;
            for (let index = 0; index < limit; index++) {
                /** @type {HistoryRecord} */
                const { loopStepIndex, state, request: _request, context } = this._history.back();
                if (state !== "in") {
                    continue;
                }
                if (this.loader.isIndexEqual(loopStepIndex) === false) {
                    this.continue;

                }
                this._history.back();
                this._context = context;
                this._emitter.setState(state)
                this.loader.setStepIndex(loopStepIndex)
                const _response = await this._emitter.run(_request)
                responses.push(_response)


            }

        }



        return responses

    }
    async break(request, response) {
        let responses = [response]
        this._context.subKey = this.loader.getSubKey();

        const stepIndex = this.loader.getRelativePosition("super")
        this.loader.setStepIndex(stepIndex)
        this._context.returnFromSub()
        const isCallbackExist = !!this._context.callback
        const now = this.loader.getNow();
        if (isCallbackExist === true) {

            const res = await this._call(this._context.callback, now, request)

            if (!res.state === false) {
                this._emitter.setState()
                const hookResponses = await this._emitter.run(request, res)
                return responses.concat(hookResponses)
            }
            responses.push(res)

        }

        /**
         * @type {State[]}
         */
        const states = ['break', 'returnFromSub']
        for (const state of states) {
            const hookResponse = await this._call("break", request, now, true)
            if (!hookResponse === false) {
                responses.push(hookResponse)
                if (!hookResponse.state === false) {
                    this._emitter.setState(hookResponse.state)
                    const hookResponses = await this._emitter.run()
                    responses = responses.concat(hookResponses)
                    return responses;

                }
            }
        }
        if (this._emitter.getState() === 'break') {
            this._emitter.setState('forwardOut')
            const hookResponses = await this._emitter.run(request, responses[responses.length - 1])
            responses = responses.concat(hookResponses)
        }






        return responses







    }
    continue(request, response, isAutoForward = true) {
        const stepIndex = this.loader.getRelativePosition("now", "start")
        this.loader.setStepIndex(stepIndex)
        return this._callHookFunction("continue", request, response, isAutoForward)

    }
    /**
     * 
     * @param {State} state 
     * @param {any} request 
     * @param {any} response 
     * @param {boolean} [isAutoForward=true] 
     */
    async _callHookFunction(state, request, response, isAutoForward = true) {
        let responses = []
        const now = this.loader.getNow();
        const callable = !!now[state]
        if (callable) {
            await this._call(state, now, request, response)
            const responseState = this._emitter.getState()
            if (responseState !== state && responseState !== "wait") {
                const _responses = await this._emitter.run(request, response, isAutoForward);
                responses = responses.concat(_responses)
            }

        }


        if (isAutoForward === true && this.isEnd() === false && (callable === false || this._emitter.getState() === "forwardOut")) {
            this._emitter.setState("in")

        }
        if (isAutoForward === true && this._emitter.getState() === "in") {
            const inResponses = await this._emitter.run(request)
            responses = responses.concat(inResponses)

        }
        return responses;


    }
    /**
     * 
     * @param {State | string} funcname
     * @param {PlugIns} plugins 
     * @param {boolean} [isIgnoreNotExist=false] 
     * @param {*} args  
     */
    async _call(funcname, plugins, request, isIgnoreNotExist = false, args = []) {
        if (isIgnoreNotExist === true && funcname in plugins === false) {
            return
        }
        let context;
        /**
         * @type {State}
         */
        const callState = stateKeys.indexOf(funcname) === -1 ? this._emitter.getState() : funcname
        if (this.isDebug === true || callState === "in" || callState === "wait") {
            context = merge({}, this._context.toJSON())
        }


        /**
         * @type {StateResponse}
         */
        const response = await plugins[funcname].call(plugins, request, this._context, this, ...args) || {}
        if (this.isDebug === true || callState === "in" || callState === "wait") {
            /**
             * @type {HistoryRecord}
             */
            const record = { request, response, context, loopStepIndex: this.loader.getStepIndex(), state: callState }
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