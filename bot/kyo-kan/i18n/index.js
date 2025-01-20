
const { i18nOptions } = require('./options')


/**
 * @typedef {import('../plugin_type').i18nFunc} i18nfunc
 * */

class I18n {
    constructor(language) {
        /**
         * @type {i18nfunc[]}
         */
        this.i18nFuncs = []
        this.language = language
    }

    getMessage(key, options) {
        for (const func of this.i18nFuncs) {
            const ret = func(key, this.language, options)
            if (!ret === false) {
                return ret;
            }
        }

    }

}


function getI18n(language) {
    const ret = new I18n(language)
    ret.i18nFuncs.push(i18nOptions)
    return ret;
}
module.exports = { getI18n, I18n }