const { Model } = require('./basic')
const { JsonHook } = require('./hook/json')
module.exports = { Secret }


/**
 * 
 * 
 * @typedef {{value:any}} Properties
 * @typedef {import('./basic').PropertyHooksMap<Properties>} PropertyHooksMap
 */

class Secret extends Model {
    /**
     * @type {Properties}
     */
    properties = {}

    /**
     * @type {PropertyHooksMap}
     */
    hooks = {
        value: JsonHook({
            excludeFromIndexes: true
        })
    }

}

