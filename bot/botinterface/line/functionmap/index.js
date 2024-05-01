const deepmerge = require("deepmerge")
const blob = require("./request_blob")

const FunctionMapmList = [
    blob
]
/**
 * 
 * @param {import("../types/function_map").LinePlatform} linePlatform
 * @returns {import("../../standized_protocol/requestype/basic").StandardizedFunctionMap} 
 */
function getFunctionMap(linePlatform) {


    return deepmerge.all(FunctionMapmList.map(function ({ name, cls }) {
        const ret = []
        ret[name] = new cls(linePlatform)
        return ret

    }))

}

module.exports = { getFunctionMap }