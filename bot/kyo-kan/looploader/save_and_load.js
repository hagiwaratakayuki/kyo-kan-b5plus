
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





class BaseConstraction extends JSONSerializer {

    constructor() {
        super();
        /**
         * @type {import('./base_type').BuilderConfig[]}
         */
        this._startConfigures = []

        this._loopScenarioId = 0

        /**
         * @type {BuilderConfigMap}
         */
        this.builderConfigMap = {};
        /**
         * @type {LoopScenario[]}
         */
        this._loopScenarios = [[]]

        this._nameToId = {}

        this._loopTypes = {}
        this._subLoopTypeMap = { 0: getSubLoopTypeId('loop') }


        this.resetPosition();










    }
    getLoopScenario(loopScenarioId) {
        return this._loopScenarios[loopScenarioId || this._loopScenarioId]
    }
    getLoopScenarioByName(loopScenarioName) {
        const loopScenarioId = this._nameToId[loopScenarioName]
        return this.getLoopScenario(loopScenarioId)

    }


    resetPosition() {
        /**
         * @type {LoopStepIndex[]}
        */
        this._loopStepIndexPath = []
        this.setLoopStepIndex([0, -1])




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
    /**
     * 
     * @returns {LoopStepIndex}
     */
    getLoopStepIndex() {
        return [this._loopScenarioId, this._step]
    }
    /**
     * 
     * @param {LoopStepIndex} param0 
     */
    setLoopStepIndex([loopScenarioId, step = -1]) {

        this._loopScenarioId = loopScenarioId
        this._step = step

    }
    /**
     * 
     * @param {LoopStepIndex?} loopStepIndex 
     */

    _getLoopStep(loopStepIndex = []) {

        const [loopScenarioId = this._loopScenarioId, step = this._step] = loopStepIndex || []
        return this.getLoopScenario(loopScenarioId)[step]
    }




    /**
    * 
    * @param {number[]?} loopStepId
    * @param {string[]?} loopScenarioId
    */
    _getLoopState(loopScenarioId, step) {

        return this.getLoopScenario(loopScenarioId)[step]
    }
    /**
     * 
     * @param {LoopStepIndex} loopStepIndex 
     */
    _forwardToScenario(loopStepIndex) {
        this._loopStepIndexPath.push(this.getLoopStepIndex())
        this.setLoopStepIndex(loopStepIndex)
    }
    _returnFromScenario() {
        const loopStepIndex = this._loopStepIndexPath.pop()
        this.setLoopStepIndex(loopStepIndex)
    }

    /**
     * 
     * @param {LoopStep[]} loopSteps 
     * @param {LoopStepIndex?} loopStepIndex
     */
    insertLoop(loopSteps, loopStepIndex) {
        const [loopScenarioId, step] = loopStepIndex || this.getLoopStepIndex()
        const loopScenario = this.getLoopScenario(loopScenarioId)
        loopScenario.splice(step + 1, 0, ...loopSteps)



    }





}


class Saver extends BaseConstraction {
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


        let _options = this._mergeOptions(builderID, options);


        const step = this._getInitialLoopStep(builderID, _options)
        this.getLoopScenario().push(step)
        this._step += 1



    }
    startLoopFilter(name) {

        /**
         * @type {LoopStep}
         */
        const loopStep = this._getLoopStep()
        const { loopScenarioId, loopScenario } = this._getOrInitializeLoopScenario(name || loopStep.filt, false)

        const filts = loopStep.filts || []
        if (!name) {
            loopStep.filt = loopScenarioId

        }
        else if (filts.indexOf(loopScenarioId) === -1) {
            filts.push(loopScenarioId)
            loopStep.filts = filts

        }
        this._forwardToScenario([loopScenarioId, loopScenario.length - 1])


    }
    endLoopScenario() {
        this._returnFromScenario()
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
     * @param {string?} [loopScenarioName=null] 
     */
    startSubLoop(subLoopType, subLoopKey = '', loopScenarioName = null) {
        const loopStep = this._getLoopStep()
        let loopScenarioId, step = -1
        if (subLoopKey in loopStep.s === false) {
            loopScenarioId = this._getOrInitializeLoopScenario(loopScenarioName, subLoopType).loopScenarioId

            loopStep.s[subLoopKey] = loopScenarioId


        }
        else {
            loopScenarioId = loopStep.s[subLoopKey]
            step = this.getLoopScenario(loopScenarioId).length - 1

        }
        this._forwardToScenario([loopScenarioId, step])





    }

    endSubLoop() {
        this._returnFromScenario()
    }
    /**
     * 
     * @param {string} subLoopName 
     
     * @param {string} subLoopName 

     */
    startNamedLoopScenario(subLoopName, subLoopType) {
        const { loopScenario, loopScenarioId } = this._getOrInitializeLoopScenario(subLoopName, subLoopType)
        this._forwardToScenario([loopScenarioId, loopScenario.length - 1])




    }
    endNamedScenario() {
        this._returnFromScenario()
    }

    _defaultMerge(basicOptions, options) {
        return merge(basicOptions, options)

    }
    /**
     * @param {string | number | null} [loopScenarioIdOrName=null]
     * @param {string | false} [subLoopType="loop"]   
    * @returns {{loopScenario:LoopScenario, loopScenarioId:number}}
    */
    _getOrInitializeLoopScenario(loopScenarioIdOrName = null, subLoopType = "loop") {
        const idOrNameType = typeof loopScenarioIdOrName

        if (idOrNameType === 'string') {
            if (loopScenarioIdOrName in this._nameToId) {
                const loopScenarioId = this._nameToId[loopScenarioIdOrName]
                return { loopScenario: this.getLoopScenario(), loopScenarioId }

            }
            else {
                const loopScenarioId = this._loopScenarios.length
                const loopScenario = []
                this._loopScenarios.push(loopScenario)
                this._nameToId[loopScenarioIdOrName] = loopScenarioId
                this._subLoopTypeMap[loopScenarioId] = getSubLoopTypeId(subLoopType)
                return { loopScenario, loopScenarioId }

            }

        }
        if (idOrNameType === 'number') {
            return { loopScenario: this.getLoopScenario(loopScenarioIdOrName), loopScenarioId: idOrNameType }
        }
        const loopScenarioId = this._loopScenarios.length
        const loopScenario = []
        this._loopScenarios.push(loopScenario)
        if (subLoopType !== false) {
            this._subLoopTypeMap[loopScenarioId] = getSubLoopTypeId(subLoopType)
        }

        return { loopScenario, loopScenarioId }



    }
    /**
     * 
     * @returns {LoopStep}
     */
    _getInitialLoopStep(builderID, options) {
        return {
            o: options,
            bID: builderID,

            s: {}
        }
    }



}




class Loader extends BaseConstraction {
    /**
     * 
     * @param {boolean} isFirst 
     * @param {string} i18nFunc
     * @param {import('../plugin_type').CommonOptions} commonOptions  
     * @param {any} functionMap
     * @returns 
     */
    constructor(isFirst = false, language = '', commonOptions = {}, functionMap = {}) {
        super();
        this._isFirst = isFirst
        this._language = language

        this._language = language
        this._commonOptions = commonOptions
        this._functionMap = Object.assign({}, functionMap)
        this._subKeyPath = []
        this._subKey = null
        this._subStepId = null
        this._positionStates = []






    }
    resetPosition() {
        /**
        * @type {import('./base_type').PositionState}
        */
        this.positionState = { isEnd: false, isSubLoopEnd: false };

        super.resetPosition()
        this._positionStates = []




    }
    setFunctionMap(functionMap) {
        Object.assign(this._functionMap, functionMap)

    }
    /**
     * 
     * @param {LoopStepIndex} loopStepIndex 
     */
    setLoopStepIndex(loopStepIndex) {
        super.setLoopStepIndex(loopStepIndex)
        const [loopScenarioId, step] = loopStepIndex

        if (this.getLoopScenario(loopScenarioId).length - 1 === step && step != -1) {

            this.positionState = { isEnd: this.isTopLoop(), isSubLoopEnd: true }
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
                isSubLoopEnd = this._step === this.getLoopScenario().length - 1
            }


        }
        else if (this._loopScenarioId !== 0) {


            this._returnFromScenario()
            const [subKey, subId] = this._subKeyPath.pop()
            this._subKey = subKey
            this._subId = subId
            const positionState = this._positionStates.pop()
            isEnd = positionState.isEnd
            isSubLoopEnd = positionState.isSubLoopEnd


        }
        if (isSubLoopEnd == true && this._loopScenarioId === 0) {

            isEnd = true
        }

        this.positionState = { isEnd, isSubLoopEnd }
        return this.getNow();
    }

    /**
     * 
     * @param {number?} subId
     * @param {string?} subKey
     */
    forwardToSub(subId, subKey = '') {
        const nowLoop = this._getLoopStep()
        const subLoopId = nowLoop.s[subKey]

        const isSubLoopTypeSelection = getSubLoopType(this._subLoopTypeMap[subLoopId]) === "selection"
        const step = isSubLoopTypeSelection ? subId : 0
        this._forwardToScenario([subLoopId, step])
        this._positionStates.push(this.positionState)
        this.positionState = { isEnd: false, isSubLoopEnd: isSubLoopTypeSelection }

        this._subKeyPath.push([subKey, subId])





        return this.getNow()


    }
    /**
     * @param {boolean} isIgnoreCache 
     * @returns {[import('../plugin_type').PlugIn,import('../plugin_type').PlugIn ]}
     */
    getNow(isIgnoreCache = false) {
        const loopStepIndex = this.getLoopStepIndex();
        if (isIgnoreCache === false && !!this._cacheKey === true && this._cacheKey[0] === loopStepIndex[0] && this._cacheKey[1] === loopStepIndex[1]) {
            return this._cache

        }

        const loopStep = this._getLoopStep()
        this._cache = this.buildStep(loopStep);
        this._cacheKey = loopStepIndex;
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

        const my = this
        const filtConfigs = (loopStep.filts || []).reduce(function (prev, now) {
            return prev.concat(my._loopScenarios[now])
        })
        if (!!loopStep.filt) {
            filtConfigs.push(this._loopScenarios[loopStep.filt])
        }

        for (const filterConfig of filtConfigs) {
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

        const subLoopId = this._getLoopStep().s[subLoopKey]

        const subLoopsCount = this.getLoopScenario(subLoopId).length
        /**
         * @type {SubLoopDocumentList}
         */
        const documentList = [];
        for (let subid = 0; subid < subLoopsCount; subid++) {
            const document = this.getDocument(filter, [subLoopId, subid]);
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
        const loopScenarioId = this.getLoopScenario(this._getLoopStep().s[subLoopKey])
        return this.getDocument(subid, filter, loopScenarioId, [loopScenarioId, subid])
    }
    /**
     * @param {string[]} [filter=[]]  
     * @param {LoopStepIndex?} loopStepIndex 
     * @returns {Document}
     */
    getDocument(filter = ["description", "title"], loopStepIndex = []) {
        const { builderID, options } = this._getLoopStep(loopStepIndex);
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
    /**
     * 
     * @param {"now" |  "super"  | "top"} [loop=now]
     * @param {number | "end" | "start"} [move=-1]  
     */
    getRelativePosition(loop = "now", move = -1) {
        const loopScenarioPath = this._loopStepIndexPath
        let loopStepIndex, step
        if (loop === "top") {
            loopStepIndex = loopScenarioPath[0] || this.getLoopStepIndex();
            step = loopStepIndex[1]



        }
        else if (loop === "super") {
            loopStepIndex = loopScenarioPath[loopScenarioPath.length - 1];
            step = loopStepIndex[1]


        }

        if (move === "end") {
            loopStepIndex = this.getLoopStepIndex()
            step = this.getLoopScenario(loopStepIndex[0]).length - 1




        }
        if (move === "start") {
            loopStepIndex = this.getLoopStepIndex()
            step = 0

        }
        if (loop === "now") {
            loopStepIndex = this.getLoopStepIndex()
            step = loopStepIndex[1] + move
            if (this.getLoopScenario(loopStepIndex[0]).length - 1 < step || step < 0) {
                throw "can not move"
            }



        }
        const ret = loopStepIndex.concat([])
        ret[1] = step
        return loopStepIndex;

    }

    getSubKey() {
        return this._subKeyPath[this._subKeyPath.length - 1]
    }
    getSubId() {
        return this._step
    }




}


module.exports = { Saver, Loader, BaseConstraction };