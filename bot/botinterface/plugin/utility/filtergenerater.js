/**
 * 
 * @typedef {import("../../../kyo-kan/protocol").PluginFilterProtocol & ThisType<FilterThisType>}filter
 * @typedef 
 * @param {{key:string | string , filter:filter }[]} filterConfigures 
 */

function FilterGenerater(filterConfigures) {
    const filters = {}
    let isCatchAll = false
    for (const { key, filter } of filterConfigures) {
        if (key === "*") {
            isCatchAll = filter
        }
        else if (typeof key === "string") {
            filters[key] = filter
        }
        else {
            for (const k of key) {
                filters[k] = filter

            }
        }
    }
    return builder.bind({ filters, isCatchAll })


}
/**
 * @this {{isCatchAll?:false | Function, filters:Object<string, Function>}}
 */
function builder(commonOptions, options, functionMap) {
    const core = { commonOptions, options, functionMap }
    const handler = {
        has(target, key) {
            if (this.isCatchAll !== false) {
                return true

            }


            return key in this.filters;
        },
        get: function (target, prop, receiver) {
            if (prop in target === false && this.isCatchAll !== false) {
                return this.isCatchAll
            }
            if (prop in this.filters) {
                return this.filters[key]
            }
            return Reflect.get(...arguments)
        },
        isCatchAll: this.isCatchAll || false,

        filters: this.filters
    };
    return new Proxy(core, handler)



    const proxy1 = new Proxy(mons

}