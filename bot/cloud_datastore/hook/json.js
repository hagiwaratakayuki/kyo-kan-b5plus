/**
 * @typedef {import('../utiltype').PropertyHooks} PropertyHooks
 * 
 */

const { json } = require('stream/consumers')

/**
 * 
 * @param {PropertyHooks?} hooks
 * @returns {PropertyHooks} 
 */
module.exports.JsonHook = function (hooks = {}) {
    return Object.assign({
        onLoad: function (value) {
            return JSON.parse(value)
        },
        onSave: function (value) {
            if (typeof value === 'object') {
                return JSON.stringify(value)
            }
            return value
        }
    }, hooks)

}
