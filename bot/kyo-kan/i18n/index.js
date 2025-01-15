
const { i18nOptions } = require('./options')


/**
 * @typedef {import('../plugin_type').i18nFunc} i18nfunc
 * */

class I18n {
    constructor() {
        /**
         * @type {i18nfunc[]}
         */
        this.i18nFuncs = []
    }

    getMessage(key, language, options) {
        for (const func of this.i18nFuncs) {
            const ret = func(key, language, options)
            if (!ret === false) {
                return ret;
            }
        }

    }

}


function getI18n() {
    const ret = new I18n()
    ret.i18nFuncs.push(i18nOptions)
    return ret;
}
module.exports = { getI18n, I18n }