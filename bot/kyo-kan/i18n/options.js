/** 
* @type {import("../looploader/base_type").i18nFunc}
*/
function i18nOptions(key, language, options) {
    let message = (options.i18n || {})[language]
    for (const k of key.split('.')) {
        message = message[k] || {}

    }
    if (typeof message === "string") {
        return message
    }


}

module.exports = { i18nOptions }