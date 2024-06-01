
const merge = require('deepmerge');
const { JSONSerializer } = require('../json_serializer')
const { getSubLoopType, getSubLoopTypeId } = require('./loop_type');

/**
 * @typedef {import('./base_type').BuilderConfigMap} BuilderConfigMap
 * @typedef {import('./base_type').DocumentPropertis} DocumentPropertis
 * @typedef {import('./base_type').Document} Document
 * @typedef {import('./base_type').SubLoopDocumentList} SubLoopDocumentList
 * @typedef {import('./base_type').LoopStep } LoopStep
 * @typedef {import('./base_type').LoopScenario } LoopScenario
 * @typedef {import('./base_type').LoopState<LoopStep>} LoopState
 * @typedef {import('./base_type').LoopStepIndex} LoopStepIndex
 * @typedef { [number[], string[]] } LoopStepPathPaire
*/





class Brige extends JSONSerializer {

    constructor() {
        super();
        /**
         * @type {import('./base_type').BuilderConfig[]}
         */
        this._startConfigures = [[]]

        /**
         * @type {BuilderConfigMap}
         */
        this.builderConfigMap = {};
        /**
         * @type {LoopScenario[]}
         */
        this._loopScenarios = []

        this._nameToId = {}

        this._loopTypes = {}
        this._subLoopTypeMap = { 0: getSubLoopTypeId('loop') }


        this.resetPosition();










    }

    /**
     * @returns {LoopStep}
     */
    _getInitialSubLoop(subLoopType = "loop") {
        return {
            t: getSubLoopTypeId(subLoopType),
            stp: []

        }
    }
    /**
     * 
     * @returns {LoopStep}
     */
    _getInitialLoopStep(builderID, options) {
        return {
            o: options,
            bID: builderID,
            filt: [],
            s: {}
        }
    }

    resetPosition() {

        this.setStepIndex([0, -1])



    }




    /**
    * 
    * @param {BuilderConfigMap} builderConfigMap 
    */
    buildersRegistration(builderConfigMap) {
        this.builderConfigMap = Object.assign(this.builderConfigMap, builderConfigMap);
    }
    /**
    * @param {any} builderID 
    * @param {import('./base_type').BuilderConfig} builderConfig 
    */
    builderRegistration(builderID, builderConfig) {
        this.builderConfigMap[builderID] = builderConfig
    }
    getStepIndex() {
        return [this._loopScenarioId, this._step]
    }
    /**
     * 
     * @param {LoopStepIndex} param0 
     */
    setStepIndex([loopScenarioId, step]) {

        this._loopScenarioId = loopScenarioId
        this._step = step

    }
    /**
     * 
     * @param {LoopStepIndex?} loopStepIndex 
     */

    _getLoopStep(loopStepIndex = []) {

        const [loopScenarioId = this._loopScenarioId, step = this._step] = loopStepIndex || []
        return this._loopScenarios[loopScenarioId][step]
    }


    _getSuperLoopStep(loopScenarioId, step) {

        const _loopScenarioId = loopScenarioId || this._loopScenarioId
        const _loopStepKeyPath = loopStepKeyPath || this.loopStepKeyPath
        return this._getLoopStep(_loopStepPath.slice(0, -1), _loopStepKeyPath.slice(0, -1))
    }

    /**
    * 
    * @param {number[]?} loopStepId
    * @param {string[]?} loopScenarioId
    */
    _getLoopState(loopStepId, loopScenarioId) {
        const _loopStepPath = loopStepId || this.loopStepPath
        const _loopStepKeyPath = loopStepKeyPath || this.loopStepKeyPath
        const superLoopStep = this._getSuperLoopStep(_loopStepPath.slice(0, -1), _loopStepKeyPath.slice(0, -1))
        return superLoopStep.s[_loopStepKeyPath[_loopStepKeyPath.length - 1]]
    }
    /**
     * 
     * @param {LoopStep[]} loopSteps 
     */
    insertLoop(loopSteps, loopStepPath, loopStepKeyPath) {
        const _loopStepPath = loopStepPath || this.loopStepPath
        const _loopStepKeyPath = loopStepKeyPath || this.loopStepKeyPath
        const superLoopStep = this._getSuperLoopStep(_loopStepPath.slice(0, -1), _loopStepKeyPath.slice(0, -1))
        superLoopStep.s[_loopStepKeyPath[_loopStepKeyPath.length - 1]].stp.splice(_loopStepKeyPath[_loopStepPath.length - 1], 0, ...loopSteps)

    }





}


class Saver extends Brige {
    /**
     * 
     * @param {string} builderID
     * @param {Object?} options
     *  
    */
    addStartStep(builderID, options) {
        const _options = this._mergeOptions(builderID, options)
        this._startConfigures.push({ builderID, options: _options })
    }

    /**
     * 
     * @param {string} builderID
     * @param {Object?} options
     *  
     */
    addLoopStep(builderID, options) {
        this.loopStepPath[this.loopStepPath.length - 1] += 1;

        let _options = this._mergeOptions(builderID, options);


        const step = this._getInitialLoopStep(builderID, _options)
        this._loopScenario.push(step)
        this._step += 1



    }
    addStepFilter(builderID, options) {
        const _options = this._mergeOptions(builderID, options);
        /**
         * @type {LoopStep}
         */
        const loopStep = this._getLoopStep()
        loopStep.filt.push({
            o: _options,
            bID: builderID
        })
    }
    _mergeOptions(builderID, options) {
        const { options: basicOptions, mergeFunction = this._defaultMerge } = this.builderConfigMap[builderID]
        let _options
        if (options && basicOptions) {
            _options = mergeFunction(basicOptions || {}, options)
        }
        else if (options) {
            _options = options
        }
        return options;
    }
    /**
     * 
     * @param {import('./base_type').SubLoopType} subLoopType
     * @param {string} [subLoopKey = '']
     */
    startSubLoop(subLoopType, subLoopKey = '') {
        const step = this._getLoopStep()
        if (subLoopKey in step.s === false) {
            step.s[subLoopKey] = this._getInitialSubLoop(subLoopType)
        }

        this.loopStepPath.push(-1)
        this.loopStepKeyPath.push(subLoopKey)

    }

    endSubLoop() {
        this.loopStepPath.pop()
        this.loopStepKeyPath.pop()
    }

    _defaultMerge(basicOptions, options) {
        return merge(basicOptions, options)

    }




}




class Loader extends Brige {
    /**
     * 
     * @param {boolean} isFirst 
     * @param {string} i18nFunc
     * @param {import('../plugin_type').CommonOptions} commonOptions  
     * @param {any} functionMap
     * @returns 
     */
    constructor(isFirst = false, language = '', i18nFunc = null, commonOptions = {}, functionMap = {}) {
        super();
        this._isFirst = isFirst
        this._language = language
        /**
         * @type {import('./base_type').PositionState}
         */
        this.positionState = { isEnd: false, isSubLoopEnd: false };
        this._language = language
        this._commonOptions = commonOptions
        this._functionMap = Object.assign({}, functionMap)


    }
    resetPosition() {
        super.resetPosition()
        /**
      * @type {LoopStepIndex[]}
      */
        this._loopScenarioPath = []
    }
    setFunctionMap(functionMap) {
        Object.assign(this._functionMap, functionMap)

    }
    /**
     * 
     * @param {LoopStepIndex} loopStepIndex 
     */
    setStepIndex(loopStepIndex) {
        super.setStepIndex(loopStepIndex)
        const [loopScenarioId, step] = loopStepIndex

        if (this._loopScenarios[loopScenarioId].length - 1) {

            this.positionState.isEnd = this.isTopLoop();
            this.positionState.isSubLoopEnd = true
        }
        else if (getSubLoopType(this._subLoopTypeMap[loopStepIndex]) === 'selection') {
            this.positionState = { isEnd: false, isSubLoopEnd: true }
        }
        else {
            this.positionState = { isEnd: false, isSubLoopEnd: false }
        }

    }
    isTopLoop() {
        return this._loopScenarioId === 0
    }
    fromJSON(jsonData) {

        super.fromJSON(jsonData);
        if (this._isFirst === true) {
            this.resetPosition();
        }

    }
    resetPosition() {
        super.resetPosition();
        this.positionState = { isEnd: false, isSubLoopEnd: false }
    }
    toJSON() {
        /**
         * @type {Array<keyof Loader>}
         */
        const filters = ['_cache', '_cacheKey', '_isFirst', '_language'];
        return super._toJSON(filters);
    }
    /**
     * @param {LoopStepIndex} indexA 
     * @param {LoopStepIndex} indexB 
     */
    isIndexEqual(indexA, indexB) {
        return indexA[0] === indexB[0] && indexA[1] === indexB[1]

    }
    forward() {




        /**
         * @type {boolean}
         */
        let isEnd = false;
        /**
         * @type {boolean}
         */
        let isSubLoopEnd = false;







        if (this.positionState.isSubLoopEnd === false) {
            this._step += 1
            const subLoopType = getSubLoopType(this._subLoopTypeMap[this._loopScenarioId])
            if (subLoopType === 'selection') {
                isSubLoopEnd = true
            }
            if (subLoopType === 'loop') {
                isSubLoopEnd = this._step === this._loopScenario
            }


        }
        else if (this._loopScenarioId != 0) {


            const loopStepIndex = this._loopScenarioPath.pop()
            this.setStepIndex(loopStepIndex)

        }
        if (isSubLoopEnd == true && this._loopScenarioId === 0) {

            isEnd = true
        }

        this.positionState = { isEnd, isSubLoopEnd }
        return this.getNow();
    }
    /**
     * 
     * @param {"now" |  "super"  | "top"} [loop=now]
     * @param {number | "end" | "start"} [move=-1]  
     */
    getRelativePosition(loop = "now", move = -1) {
        let [loopScenarioId, step] = this.getStepIndex()
        if (loop === "top") {
            loopScenarioId = loopScenarioId.slice(0, 1);
            step = step.slice(0, 1);


        }
        else if (loop === "super") {
            loopScenarioId = loopScenarioId.slice(0, -1);
            step = step.slice(0, -1);

        }

        if (move === "end") {
            const loopState = this._getLoopState(loopScenarioId, step);
            loopScenarioId[loopScenarioId.length - 1] = loopState.stp.length - 1




        }
        if (move === "start") {
            loopScenarioId[loopScenarioId.length - 1] = 0

        }
        if (loop === "now") {
            const tailIndex = loopScenarioId.length - 1
            const loopState = this._getLoopState(loopScenarioId, step)
            const targetStep = loopScenarioId[tailIndex] + move
            if (superLoopStep.s[step[tailIndex]].stp.length - 1 < targetStep || targetStep < 0) {
                throw "can not move"
            }


            loopScenarioId[tailIndex] = targetStep;
        }
        return [loopScenarioId, step];

    }
    /**
     * 
     * @param {number?} subid
     * @param {string?} subkey
     */
    forwardToSub(subid, subkey = '') {
        const nowLoop = this._getLoopStep()
        const subLoopId = nowLoop.s[subkey]
        c
        const isSubLoopTypeSelection = getSubLoopType(this._subLoopTypeMap[subLoopId]) === "selection"
        this._loopScenarioPath.push(this.getStepIndex())
        const step = isSubLoopTypeSelection ? subid : 0
        this.setStepIndex([subLoopId, step])




        return this.getNow()


    }
    /**
     * @param {boolean} isIgnoreCache 
     * @returns {[import('../plugin_type').PlugIn,import('../plugin_type').PlugIn ]}
     */
    getNow(isIgnoreCache = false) {
        const loopStep = this._getLoopStep();
        if (!isIgnoreCache && this._cacheKey === loopStep) {
            return this._cache

        }

        //@ts-ignore
        this._cache = this.buildStep(loopStep);
        this._cacheKey = loopStep;
        return this._cache;
    }
    getStartStep() {
        const ret = []
        for (const loopStep of this._startConfigures) {
            ret.push(this.buildStep(loopStep))
        }
        return ret;
    }
    /**
     * 
     * @param {import('./base_type').LoopStep} loopStep
     * @returns {any} 
     */
    buildStep(loopStep) {
        const builderConfig = this.builderConfigMap[loopStep.bID];
        const plugIns = builderConfig.builder(loopStep.o, this._commonOptions, this._language, this._functionMap)
        const filters = []
        for (const filterConfig of loopStep.filt) {
            const _filterBuilderConfig = this.builderConfigMap[filterConfig.bID]
            const filterPlugins = _filterBuilderConfig.builder(filterConfig.o, this._commonOptions, this._language, this._functionMap)
            filters.push(filterPlugins)
        }
        return [plugIns, filters]


    }
    buildTarget(builderId, options) {
        const builderConfig = this.builderConfigMap[builderId];
        return builderConfig.builder(options, this._commonOptions, this._language, this._functionMap)

    }

    /**
     * 
     * @param {string[]?} names 
     */
    getBuilderDocuments(names) {
        const _names = names || this.builderConfigMap
    }


    /**
    * 
   
 
    * @param {DocumentPropertis?} filter
    * @param {string} [subLoopKey=''] 
    * @returns {SubLoopDocumentList}  
    */
    getSubLoopDocuments(filter = ["description", "title"], subLoopKey = '') {


        // @ts-ignore
        const subLoopsCount = this._getLoopStep().s[subLoopKey].stp.length
        /**
         * @type {SubLoopDocumentList}
         */
        const documentList = [];
        for (let subid = 0; subid < subLoopsCount; subid++) {
            const document = this.getSubLoopDocument(subid, language, filter, subLoopKey);
            documentList.push({ subid, document });
        }
        return documentList;

    }
    /**
     * 
     * @param {any} subid 
     * @param {DocumentPropertis?} filter
     * @param {string} [subLoopKey=''] 
     * @returns {Document}  
     */
    getSubLoopDocument(subid, filter = ["description", "title"], subLoopKey = '') {
        return this.getDocument(subid, filter, this.loopStepPath.concat([subid]), this.loopStepKeyPath.concat([subLoopKey]))
    }
    /**
     * @param {string[]} [filter=[]]  
     * @param {number[]?} loopStepPath 
     * @param {string[]?} loopStepKeyPath 
     * @returns {Document}
     */
    getDocument(filter = ["description", "title"], loopStepPath, loopStepKeyPath) {
        const { builderID, options } = this._getLoopStep(loopStepPath, loopStepKeyPath);
        return this._getDocument(filter, builderID, options)
    }
    _getDocument(filter = ["description", "title"], builderID, options) {

        /**
         * @type {Document}
         */
        const document = {}
        const { documentLoader } = this.builderConfigMap[builderID]

        if (!documentLoader) {
            throw builderID + " has no document";

        }
        for (const property of filter) {
            document[property] = documentLoader[property].call(this._language, options)
        }
        return document;




    }
    getSubKey() {
        return this.loopStepKeyPath[this.loopStepKeyPath - 1]
    }
    getSubId() {
        return this.loopStepPath[this.loopStepPath.length - 1]
    }




}


module.exports = { Saver, Loader, Brige };