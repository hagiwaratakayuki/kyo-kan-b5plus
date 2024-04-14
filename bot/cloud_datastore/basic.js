const { Datastore, Key } = require('@google-cloud/datastore');
let DATA_STORE = new Datastore()

function setDataStore(mock) {
    DATA_STORE = mock
}
/**
 * @template T
 * @typedef {{
 *      key:Object
 *      data: T 
 * }} Entity<T> 
 */


/**
 * @typedef {import("./utiltype").PropertyHooks} PropertyHooks

 */

class Model {



    constructor(id = null, values = {}) {
        const _values = Object.assign({}, this.properties || {}, values)
        this._isHookExist = 'hooks' in this;
        this.properties = this._callHook(_values, 'init')
        this.excludeFromIndexs = []



    }
    /**
     * 
     * @param {any?} id
     * @param {any[]?} path 
     * @returns 
     */
    static getKey(id = null, path = null) {
        const kind = this.name
        const _path = [].concat(path || [])
        _path.unshift(kind)
        if (!!id === true) {
            _path.push(id)
        }
        const key = new Key({ path: _path })
        return key
    }
    /**
     * 
     * @param {any?} id
     * @param {any[]?} path 
     * @returns 
     */
    static async getById(id = null, path = null) {
        const key = this.getKey(id, path);
        const [resp] = await DATA_STORE.get(key);
        return new this(resp)


    }





    /**
     * 
     * @param {any} values 
     * @param {keyof PropertyHooks} funcName 
     * @returns 
     */
    _callHook(values, funcName) {




        if (this._isHookExist === true) {
            for (const [key, value] of Object.entries(values)) {
                if (isHooksExist === true && key in this.hooks === true && funcName in this.hooks[key]) {
                    values[key] = this.hooks[key][funcName](value)
                }

            }

        }



        return values

    }

}
const a = { 1: 2 }
delete a[1]

a['']

/**
 * 
 */
function setPropertyHooks() {

}

/**
 * @typedef {{ab:Array}} props
 * @type {props}
 */
class Sample extends Model {





}
new Sample()
// Creates a client
const datastore = new Datastore();