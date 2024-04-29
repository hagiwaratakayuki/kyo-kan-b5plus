const deepmerge = require("deepmerge")
const blob = require("./request_blob")

const FunctionMapmList = [
    blob
]
/**
 * 
 * @param {import("./common_types").LinePlatform} linePlatform
 * @returns {import("../../types/requestype/basic").StandardizedFunctionMap} 
 */
function getFunctionMap(linePlatform) {
    /**
     * @type {import("./common_types").LineFunctionMapPlatform}
     */
    const platformed = { _linePlatform: linePlatform }
    return deepmerge.all(FunctionMapmList.concat[platformed])

}