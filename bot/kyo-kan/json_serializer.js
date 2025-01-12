const merge = require('deepmerge')

class JSONSerializer {
    toJSON() {
        return this._toJSON();
    }
    /**
     * 
     * @param {string[]} filters 
     * @returns {any}
     */
    _toJSON(filters = []) {
        const ret = {};
        const isExecuteFilter = filters.length !== 0;
        const filterIndex = Object.fromEntries(filters.map(function (k) {
            return [k, true];
        }))

        for (const key in this) {




            if (isExecuteFilter === true && key in filterIndex) {
                continue;
            }
            const element = this[key];

            const elementType = typeof element;

            if (elementType === 'undefined' || elementType === 'function' || elementType == 'symbol') {
                continue;
            }
            if (Array.isArray(element)) {
                ret[key] = merge(element, []);
            }
            else if (elementType === 'object') {
                if (!element === true) {
                    continue
                }
                if ('toJSON' in element === true) {
                    ret[key] = element.toJSON();
                    continue

                }
                ret[key] = merge(element, {});
            }
            else {
                ret[key] = element;
            }


        }
        return ret;

    }

    /**
      * 
      * @param {Object} jsonData 
      */
    fromJSON(jsonData) {
        for (const key in jsonData) {

            const prop = this[key]
            const data = jsonData[key];
            if (Array.isArray(prop)) {
                this[key] = merge(data, []);
            }
            else if (typeof prop === 'object') {
                if (!data === true) {
                    continue
                }
                if ('fromJSON' in prop) {
                    this[key].fromJSON(data);
                    continue

                }
                this[key] = merge(data, {});
            }
            else {
                ret[key] = data;
            }


        }


    }
}

module.exports = { JSONSerializer }