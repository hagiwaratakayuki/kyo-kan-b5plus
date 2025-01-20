
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
 * @typedef {import('../plugin_type').RelativeLoopType} RelativeLoopType
 * 
*/
class LoopScenarios {
    constructor() {
        this.length = 0;

    }
    /**
     * 
     * @param {LoopScenario} scenario 
     */
    push(scenario) {
        this[this.length] = scenario;
        this.length++;

    }
    toJSON() {
        let index = 0;
        const limit = this.length
        const values = {};
        while (index < limit) {
            if (index in this === false) {
                continue;
            }
            values[index] = merge(this[index], [])
            index += 1;
        }
        return { length: this.length, values };
    }
    fromJSON({ values, length }) {
        this.length = length;

        Object.assign(this, values);

    }

}


// シナリオ　水平に並んだステップの塊。ステップ　プラグインとオプション　サブループを持つ。　サブループ　階層的に下として実行されるループ　サブループidとシナリオidのペアで表現される
class BaseConstraction extends JSONSerializer {

    constructor(firstStep = 0) {
        super();
        this._firstStep = firstStep;
        /**
         * @type {import('./base_type').BuilderConfig[]}
         */
        this._startConfigures = []
        /**
         * @type {BuilderConfigMap}
         */
        this.builderConfigMap = {};
        this.initializeScenarioData();
    }

    initializeScenarioData() {
        this._loopScenarioId = 0



        this._loopScenarios = new LoopScenarios();
        this._loopScenarios.push([]);

        this._nameToId = {}


        this._loopTypeMap = { 0: getSubLoopTypeId('loop') }


        this.resetPosition();










    }
    getLoopScenario(loopScenarioId) {
        const _loopScenarioId = typeof loopScenarioId !== "number" && !loopScenarioId ? this._loopScenarioId : loopScenarioId
        return this._loopScenarios[_loopScenarioId]
    }
    setLoopScenario(loopScenario, loopScenarioId) {
        const _loopScenarioId = typeof loopScenarioId === "undefined" ? this._loopScenarioId : loopScenarioId
        return this._loopScenarios[_loopScenarioId] = loopScenario;
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
        this.setLoopStepIndex([0, this._firstStep])




    }

    /**
     * 
     * @param {RelativeLoopType} [_loop="now"] 
     * @param {number | "end" | "start"} [move=-1]  
    */
    getRelativePosition(loop = "now", move = -1) {
        const _loop = loop || "now";
        const loopScenarioPath = this._loopStepIndexPath
        let loopStepIndex, step
        if (_loop === "top") {
            loopStepIndex = loopScenarioPath[0] || this.getLoopStepIndex();
            step = loopStepIndex[1]



        }
        else if (_loop === "super") {

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
        if (_loop === "now") {
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
        const isSubLoopEnd = this._step >= this.getLoopScenario(loopScenarioId).length - 1
        const isEnd = isSubLoopEnd && loopScenarioId === 0






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
    constructor() {
        super(-1)
    }
    toJSON() {
        /**
         * @type {Array<keyof Saver>}
         */
        const filters = ['_firstStep'];
        return super._toJSON(filters);
    }
    getJSONWithSpiltedBuilderConfig() {
        const scenario = this.toJSON();
        const { buiderConfigMap } = scenario;
        delete scenario.buiderConfigMap;
        return { buiderConfigMap, scenario }

    }

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
    /**
     * @param {Object?} options
     * @param {string} builderID
     * 
     *  
     */
    updateLoopStep(options, builderID) {


        /**
         * @type {LoopStep}
         */
        const now = this.getLoopScenario()[this._step]
        now.bID = builderID || now.builderId;
        now.options = this._mergeOptions(now.bID, options);








    }
    /**
     * @param {string} subLoopKey 
     * @param {string | number} scenarioId 
     * @param {boolean} [isAllowAddNew=true] 
     */
    updateSubLoop(subLoopKey, scenarioId, isAllowAddNew = true) {
        let _scenarioId;
        if (typeof scenarioId === 'string') {
            if (scenarioId in this._nameToId === false) {
                return false;
            }
            _subLoopId = this._nameToId[subLoopKey];
        }
        else {
            _scenarioId = subLoopKey;
        }
        /**
         * @type {LoopStep}
         */
        const now = this.getLoopScenario()[this._step]
        if (isAllowAddNew === false && subLoopKey in now.s === false) {
            return false;
        }
        now.s[subLoopKey]

    }
    deleteSubloop(subLoopKey) {
        /**
         * @type {LoopStep}
         */
        const now = this.getLoopScenario()[this._step];
        if (subLoopKey in now === false) {
            return false;
        }
        delete now.s[subLoopKey];
        return true;

    }

    /**
     * 
     * @param {"now" |  "super"  | "top"} [loop=now]
     * @param {number | "end" | "start"} [move=-1]
     * @param {boolean} [isDelete=true] 
     * @param {boolean} [isDeleteNoNamedOnly=true]   
    */
    moveRelativePosition(loop = "now", move = -1, isDelete = true, isDeleteNoNamedOnly = true) {
        if (isDelete === false || move === "end") {
            const position = this.getRelativePosition(loop, move);
            this.setLoopStepIndex(position)
            return true;
        }
        const loopStepIndexPath = this._loopStepIndexPath

        if (loop === "top") {
            this.initializeScenarioData();


        }
        else if (loop === "super") {
            if (!this._loopStepIndexPath === true || this._loopStepIndexPath.length === 0) {
                return false;
            }
            const [superLoopScenarioID, superStepNumber] = this._loopStepIndexPath[loopStepIndexPath.length - 1];
            /**
             * @type {LoopStep}
             */
            const superStep = this._loopScenarios[superLoopScenarioID][superStepNumber]
            const nowScenarioId = this._loopScenarioId;
            const subLoopKeys = Object.entries(superStep.s).filter(function ([key, value]) {
                return value == nowScenarioId;
            });
            for (const [subLoopKey] of subLoopKeys) {
                delete superStep.s[subLoopKey];
            }
            this._returnFromScenario();
            if (isDelete === true) {
                if (isDeleteNoNamedOnly === true) {
                    if (Object.values(this._nameToId).indexOf(nowScenarioId) !== -1) {
                        return;
                    }

                }
                delete this._loopScenarios[nowScenarioId]

            }


        }



        if (loop === "now") {

            const nowStep = this._step;
            const loopScenario = this.getLoopScenario();
            let step;
            if (move === "start") {
                step = 0;

            }
            else {
                step = nowStep + move
                if (loopScenario.length - 1 < step || step < 0) {
                    return false
                }
            }
            this.setLoopScenario(loopScenario.slice(0, step + 1))
            this._step = step;



        }
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
     * @param {string | number} [subLoopKey = '']
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
     * @param {string | number | null} [_loopScenarioIdOrName=null]
     * @param {string | false} [subLoopType="loop"]   
    * @returns {{loopScenario:LoopScenario, loopScenarioId:number}}
    */
    _getOrInitializeLoopScenario(loopScenarioIdOrName = null, subLoopType = "loop") {
        let _loopScenarioIdOrName = loopScenarioIdOrName;
        let idOrNameType = typeof _loopScenarioIdOrName

        if (idOrNameType === 'string' && /^\d+$/.test(idOrNameType) === false) {
            if (_loopScenarioIdOrName in this._nameToId) {
                const loopScenarioId = this._nameToId[_loopScenarioIdOrName]
                return { loopScenario: this.getLoopScenario(), loopScenarioId }

            }
            else {
                const loopScenarioId = this._loopScenarios.length
                const loopScenario = []
                this._loopScenarios.push(loopScenario)
                this._nameToId[_loopScenarioIdOrName] = loopScenarioId
                this._loopTypeMap[loopScenarioId] = getSubLoopTypeId(subLoopType)
                return { loopScenario, loopScenarioId }

            }

        }
        if (idOrNameType !== 'undefined' && loopScenarioIdOrName !== null) {

            return { loopScenario: this.getLoopScenario(loopScenarioIdOrName), loopScenarioId: loopScenarioIdOrName }
        }
        const loopScenarioId = this._loopScenarios.length
        const loopScenario = []
        this._loopScenarios.push(loopScenario)
        if (subLoopType !== false) {
            this._loopTypeMap[loopScenarioId] = getSubLoopTypeId(subLoopType)
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






        /**
         * 
         * @type {import('./base_type').BootBuilderConfig[]} 
         */
        this._bootPluginBulderConfigs = []
    }
    setLanguage(language) {
        this._language = language
    }
    getLanguage(language) {
        return this._language
    }
    /**
     * 
     * @param {import('./base_type').BootBuilderConfig[]} bootPluginBuilders 
     */
    registerBootPluginBuilders(bootPluginBuilders) {
        this._bootPluginBulderConfigs = bootPluginBuilders
    }

    loadBootPlugins() {
        const plugins = [];
        for (const bootPluginBulderConfig of this._bootPluginBulderConfigs) {
            let plugin;
            try {
                plugin = new bootPluginBulderConfig.builder(bootPluginBulderConfig)
            } catch (error) {

                plugin = bootPluginBulderConfig.builder(bootPluginBulderConfig)
            }
            plugins.push(plugin)
        }
        return plugins;
    }
    getFunctionMap() {
        return this._functionMap
    }
    resetPosition() {
        /**
        * @type {import('./base_type').PositionState}
        */
        this.positionState = { isEnd: false, isSubLoopEnd: false };

        super.resetPosition()
        this._positionStates = []




    }
    isLoopEnd() {
        return this._step >= this.getLoopScenario().length - 1 || getSubLoopType(this._loopTypeMap[this._loopScenarioId]) === "selection"
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
        const [loopScenarioId, step = -1] = loopStepIndex

        if (this.getLoopScenario(loopScenarioId).length - 1 <= step && step != -1) {

            this.positionState = { isEnd: this.isTopLoop(), isSubLoopEnd: true }
        }
        else if (getSubLoopType(this._loopTypeMap[loopStepIndex]) === 'selection') {
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
        const filters = ['_cache', '_cacheKey', '_isFirst', '_language', '_firstStep'];
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







        if (this.isLoopEnd() === false) {
            this._step += 1
            const subLoopType = getSubLoopType(this._loopTypeMap[this._loopScenarioId])
            if (subLoopType === 'selection') {
                isSubLoopEnd = true
            }
            if (subLoopType === 'loop') {
                isSubLoopEnd = this._step >= this.getLoopScenario().length - 1
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

        const isSubLoopTypeSelection = getSubLoopType(this._loopTypeMap[subLoopId]) === "selection"
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
     * 
     */
    buildStep(loopStep) {
        const builderConfig = this.builderConfigMap[loopStep.bID];
        let plugIns;
        try {
            plugIns = new builderConfig.builder(loopStep.o, this._commonOptions, this._language, this._functionMap);
        }
        catch {
            plugIns = builderConfig.builder(loopStep.o, this._commonOptions, this._language, this._functionMap)
        }

        const filters = []


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


    getSubKey() {
        return this._subKeyPath[this._subKeyPath.length - 1]
    }
    getSubId() {
        return this._step
    }




}


module.exports = { Saver, Loader, BaseConstraction };