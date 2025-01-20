/** 
* @type {import("../looploader/base_type").i18nFunc}
*/
function i18nOptions(keyPath, language, options) {
    let message = (options.i18n || {})[language] || {}
    const pathArray = typeof keyPath === 'string' ? keyPath.split('.') : keyPath
    for (const k of pathArray) {
        message = message[k] || {}

    }
    if (typeof message === "string") {
        return message
    }


}

module.exports = { i18nOptions }