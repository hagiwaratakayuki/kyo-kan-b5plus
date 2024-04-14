const { Datastore, Key } = require('@google-cloud/datastore');
let DATA_STORE = new Datastore()
export { setDataStore, Model }

/**
 * @template T
 * @typedef {import("./utiltype").DatastoreEntity<T>} DatastoreEntity
 */


function setDataStore(mock) {
    DATA_STORE = mock
}



/**
 * @typedef {import("./utiltype").PropertyHooks} PropertyHooks
 * @typedef {import("./utiltype").PropertyHooksMap} PropertyHooksMap
 */

class Model {
    /**
     * @type {string[]}
     */
    static excludeFromIndexs = null
    static isExcludeFromIndexsExist = false

    properties = {}
    hooks = {}





    /**
     * @type {boolean?}
     */
    static __isHookExist = null
    /**
     * @type {boolean?}
     */
    _isHookExist = null

    /**
     * @type {boolean?}
     */
    excludeLargeProperties = null


    /**
     * @type {Key?}
     */
    key = null
    /**
     *      * 
     * @param {*} idOrKey 
     * @param {*} values 
     */
    constructor(values = {}, idOrKey = null) {

        this._isHookExist = this.constructor._isHookExist(this.hooks)

        this.properties = this._callHook(Object.assign({}, this.properties || {}, values || {}), 'init', true)
        this.constructor._setExcludeFromIndexes(hooks)
        if (idOrKey instanceof Key === true) {
            this.key = key
        }
        else if (idOrKey !== null) {
            this.key = this.constructor.getKey(idOrKey)
        }




    }
    /**
     * 
     * @param {Object?} values 
     */
    save(values = {}) {
        Object.assign(this.properties, values)
        return this.constructor.save(this)

    }
    getSaveData() {
        return this._callHook(this.properties, "onSave")
    }

    /**
     * 
     */
    static _checkHookExist(hooks) {

        if (this.__isHookExist === null) {
            this.__isHookExist = !!hooks && Object.keys(hooks).length !== 0
        }
        return this.__isHookExist

    }
    /**
     * 
     * @param {PropertyHooksMap} hooks 
     */
    static _setExcludeFromIndexes(hooks) {

        if (this.excludeFromIndexs === null) {
            const excludes = [];
            for (const [hookKey, hook] of Object.entries(excludes)) {
                if (!!hook[hookKey] === true) {
                    excludes.push(hookKey)
                }

            }
            this.excludeFromIndexs = excludes
            this.isExcludeFromIndexsExist = excludes.length > 0
        }

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


        const ret = new this(resp, resp[Datastore.KEY])

        return ret.properties, ret


    }
    /**
     * 
     * @param {Model} model 
     */
    static save(model) {
        return DATA_STORE.save(this.getSaveEntity(model))

    }
    /**
     * 
     * @param {Model[]} models 
     */
    static saveMulti(models) {
        const entities = models.map(this.getSaveEntity)
        return DATA_STORE.save(entities)

    }
    /**
     * 
     * @param {Model} model 
     * @returns 
     */
    static getSaveEntity(model) {

        const data = model.getSaveData();
        const key = model.key !== null ? model.key : this.getKey()
        /**
         * @type {DatastoreEntity<typeof data>}
         */
        const entity = { data, key }
        if (this.isExcludeFromIndexsExist === true) {
            entity.excludeFromIndexs = this.excludeFromIndexs
        }
        if (model.excludeLargeProperties !== null) {
            entity.excludeLargeProperties = model.excludeLargeProperties
        }
        return entity
    }
    static query() {
        return DATA_STORE.createQuery(this.name)


    }






    /**
     * 
     * @param {any} values 
     * @param {keyof PropertyHooks} funcName
     * @param {boolean} isForce  
     * @returns 
     */
    _callHook(values, funcName, isForce = false) {


        if (this._isHookExist === true) {
            for (const [key, hook] of Object.entries(this.hooks)) {
                if (isForce === true || key in values === true && funcName in this.hooks[key]) {
                    values[key] = hook[funcName](values[key])
                }

            }

        }



        return values

    }

}



/**
 * 
 */
function setPropertyHooks() {

}
