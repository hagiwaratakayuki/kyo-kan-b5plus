const { abortAutomaton } = require('../util/abortAutomaton')
const { i18noptions: i18nOptions } = require('./options')
const defaulti18nMap = { options: i18nOptions };
/**
 * @typedef {import("../looploader/base_type").i18nFunc} i18nfunc
 * 
 * @template T
 * @param {T} i18nFuncMap
 * @returns {(key: keyof T) => i18nfunc} 
 * 
 */
function i18nfunctionMaker(i18nFuncMap) {
    /**
     * 
     * @param {keyof T} key 
     * @returns {i18nfunc}
     */
    function ret(key) {
        return i18nFuncMap[key];
    }
    return ret;

}

const defaulti18nFunc = i18nfunctionMaker(defaulti18nMap);

module.exports = { defaulti18nFunc, i18nfunctionMaker, defaulti18nMap }