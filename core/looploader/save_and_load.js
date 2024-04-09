
const merge = require('deepmerge');
const { JSONSerializer } = require('../json_serializer')
const { getSubLoopType, getSubLoopTypeId } = require('./loop_type');
/**
 * @typedef {import('./base_type').BuilderConfigMap} BuilderConfigMap
 * @typedef {import('./base_type').DocumentPropertis} DocumentPropertis
 * @typedef {import('./base_type').Document} Document
 * @typedef {import('./base_type').SubLoopDocumentList} SubLoopDocumentList
 * @typedef {import('./base_type').LoopStep } LoopStep
 * @typedef {Pick<LoopStep, 's'> | LoopStep} RouteStep
*/

const PATH_DElIMITER = '/';

class Brige extends JSONSerializer {

    constructor() {
        super();
        /**
         * @type {import('./base_type').BuilderConfig[]}
         */
        this._startConfigures = []

        /**
         * @type {BuilderConfigMap}
         */
        this.builderConfigMap = {};
        this.resetPosition();


        /**
         * @type {RouteStep}
         */
        this._rootLoop = {
            s: {
                '': {
                    t: '0',
                    stp: []

                }
            }
        };




    }


    resetPosition() {
        /**
        * @type {number[]}
        */
        this.loopStepPath = [-1];
        /**
         * @type {string[]}
         */
        this.loopStepKeyPath = ['']
    }
    getStepIndex() {
        return [[].concat(this.loopStepPath), [].concat(this.loopStepKeyPath)]
    }
    setStepIndex([loopStepPath, loopStepKeyPath]) {
        this.loopStepPath = [].concat(loopStepPath)
        this.loopStepKeyPath = [].concat(loopStepKeyPath)

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
    _toJSON(filters = []) {
        return super._toJSON(["builderConfigMap"].concat(filters));
    }

    /**
     * 
     * @param {number[]?} loopStepPath
     * @param {string[]?} loopStepKeyPath
     */
    _getLoopStep(loopStepPath, loopStepKeyPath) {
        const _loopStepPath = loopStepPath || this.loopStepPath
        const _loopStepKeyPath = loopStepKeyPath || this.loopStepKeyPath
        const limit = _loopStepPath.length
        let index = 0;
        /**
         * @type {RouteStep}
         */
        let result = this._rootLoop;
        while (index < limit) {
            result = result.s[_loopStepKeyPath[index]].stp[_loopStepPath[index]]
            index++;

        }


        return result;
    }
    /**
    * 
    * @param {number[]?} loopStepPath
    * @param {string[]?} loopStepKeyPath
    */
    _getSuperLoopStep(loopStepPath, loopStepKeyPath) {
        const _loopStepPath = loopStepPath || this.loopStepPath
        const _loopStepKeyPath = loopStepKeyPath || this.loopStepKeyPath
        return this._getLoopStep(_loopStepPath.slice(0, -1), _loopStepKeyPath.slice(0, -1))
    }
    /**
    * 
    * @param {number[]?} loopStepPath
    * @param {string[]?} loopStepKeyPath
    */
    _getLoopState(loopStepPath, loopStepKeyPath) {
        const _loopStepPath = loopStepPath || this.loopStepPath
        const _loopStepKeyPath = loopStepKeyPath || this.loopStepKeyPath
        const superLoopStep = this._getSuperLoopStep(_loopStepPath.slice(0, -1), _loopStepKeyPath.slice(0, -1))
        return superLoopStep.s[_loopStepKeyPath[loopStepKeyPath.length - 1]]
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

        const superLoop = this._getSuperLoopStep();

        /**
         * @type {RouteStep}
         */

        const step = { bID: builderID, o: _options, s: {} }
        superLoop.s[this.loopStepKeyPath[this.loopStepKeyPath.length - 1]].stp.push(step)



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
            step.s[subLoopKey] = {
                t: getSubLoopTypeId(subLoopType),
                stp: []
            }
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

/**
 *  @implements {import('./base_type.d.ts').BasicLoader }
 * 
 */
const Loader = class extends Brige {
    /**
     * 
     * @param {*} isFirst 
     * @param {*} language 
     * @param {*} i18n
     * @returns 
     */
    constructor(isFirst = false, language = '', i18n = {}) {
        super();
        this._isFirst = isFirst
        /**
         * @type {import('./base_type').PositionState}
         */
        this.positionState = { isEnd: false, isSubLoopEnd: false };
        this._language = language
        this._i18n = i18n

    }
    setStepIndex(stepIndex) {
        super.setStepIndex(stepIndex)
        const loopState = this._getLoopState();
        const step = loopStepPath[loopStepPath.length - 1];

        if (loopState.stp.length - 1 === step) {

            this.positionState.isEnd = this.isTopLoop();
            this.positionState.isSubLoopEnd = true
        }
        else {
            this.positionState = { isEnd: false, isSubLoopEnd: false }
        }

    }
    isTopLoop() {
        return this.loopStepPath.length === 1
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
        const filters = ['_cache', '_cacheKey', '_isFirst', '_i18n', '_language'];
        return super._toJSON(filters);
    }
    /**
     * @typedef {[number[], string[]]} LoopStepIndex
     * @param {LoopStepIndex} indexA 
     * @param {LoopStepIndex} indexB 
     */
    isIndexEqual(indexA, indexB) {
        const [loopStepPathA, loopStepKeyPathA] = indexA
        const [loopStepPathB, loopStepKeyPathB] = indexB
        if (loopStepKeyPathA.length !== loopStepKeyPathB.length) {
            return false

        }

        let index = loopStepPathA.length - 1;
        while (index > 0) {
            if (loopStepPathA[index] !== loopStepPathB[index] || loopStepKeyPathA[index] !== loopStepKeyPathB[index]) {
                return false;

            }
            index--;

        }
        return true;

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

        const superLoop = this._getSuperLoopStep()




        if (this.positionState.isSubLoopEnd === false) {
            const tailIndex = this.loopStepPath.length - 1;
            const step = this.loopStepPath[tailIndex] + 1;

            this.loopStepPath[tailIndex] = step
            if (this.loopStepPath.length !== 1) {

                const subLoopState = superLoop.s[this.loopStepKeyPath[this.loopStepKeyPath.length - 1]]
                const subLoopStepType = getSubLoopType(subLoopState.t)

                if (subLoopStepType === 'loop') {



                    isSubLoopEnd = subLoopState.stp.length - 1 === step;


                }



            }


        }
        else if (this.loopStepPath.length !== 1) {
            this.loopStepPath.pop()
            this.loopStepKeyPath.pop()
        }
        if (this.loopStepPath.length === 1) {

            isEnd = this.loopStepPath[0] === this._rootLoop.s[''].stp.length - 1;

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
        let [loopStepPath, loopStepKeyPath] = this.getStepIndex()
        if (loop === "top") {
            loopStepPath = loopStepPath.slice(0, 1);
            loopStepKeyPath = loopStepKeyPath.slice(0, 1);


        }
        else if (loop === "super") {
            loopStepPath = loopStepPath.slice(0, -1);
            loopStepKeyPath = loopStepKeyPath.slice(0, -1);

        }

        if (move === "end") {
            const loopState = this._getLoopState(loopStepPath, loopStepKeyPath);
            loopStepPath[loopStepPath.length - 1] = loopState.stp.length - 1




        }
        if (move === "start") {
            loopStepPath[loopStepPath.length - 1] = 0

        }
        if (loop === "now") {
            const tailIndex = loopStepPath.length - 1
            const loopState = this._getLoopState(loopStepPath, loopStepKeyPath)
            const targetStep = loopStepPath[tailIndex] + move
            if (superLoopStep.s[loopStepKeyPath[tailIndex]].stp.length - 1 < targetStep || targetStep < 0) {
                throw "can not move"
            }


            loopStepPath[tailIndex] = targetStep;
        }
        return [loopStepPath, loopStepKeyPath];

    }
    /**
     * 
     * @param {number?} subid
     * @param {string?} subkey
     */
    forwardToSub(subid, subkey = '') {
        const nowLoop = this._getLoopStep()

        const subLoopState = nowLoop.s[subkey]
        const subLoopType = getSubLoopType(subLoopState.t)

        if (!subid) {
            this.loopStepPath.push(0) // go to fix position
        }
        else {
            this.loopStepPath.push(subid);

        }



        this.loopStepKeyPath.push(subkey)
        this.positionState.isEnd = false;
        this.positionState.isSubLoopEnd = subLoopType === "selection" || subLoopState.stp.length === 1;

        return this.getNow()


    }
    /**
     * @param {boolean} isIgnoreCache 
     * @returns {import('../plugin').PlugIn}
     */
    getNow(isIgnoreCache = false) {
        const loopStep = this._getLoopStep();
        if (this._cacheKey === loopStep) {
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
     */
    buildStep(loopStep) {
        const builderConfig = this.builderConfigMap[loopStep.bID];
        return builderConfig.builder(loopStep.o, this._language, this._i18n)
    }
    /**
    * 
   
    * @param {string} language 
    * @param {DocumentPropertis?} filter
    * @param {string} [subLoopKey=''] 
    * @returns {SubLoopDocumentList}  
    */
    getSubLoopDocuments(language, filter = ["description", "title"], subLoopKey = '') {
        // @ts-ignore
        const subLoopsCount = this._getLoopStep().s[subLoopKey].steps.length
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
     * @param {string} language 
     * @param {DocumentPropertis?} filter
     * @param {string} [subLoopKey=''] 
     * @returns {Document}  
     */
    getSubLoopDocument(subid, language, filter = ["description", "title"], subLoopKey = '') {
        const document = {}
        const { builderID, options } = this._getLoopStep(this.loopStepPath.concat([subid]), this.loopStepKeyPath.concat([subLoopKey]));

        const { documentLoader } = this.builderConfigMap[builderID]

        if (!documentLoader) {
            throw builderID + " has no document";

        }
        for (const property of filter) {
            document[property] = documentLoader[property].call(language, options)
        }
        return document;




    }
    getSubKey() {
        return this.loopStepKeyPath[this.loopStepKeyPath - 1]
    }




}


module.exports = { Saver, Loader };