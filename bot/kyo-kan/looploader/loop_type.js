/**
 * @typedef {import("./base_type").SubLoopType} SubLoopType
 */

/**
 * @type {SubLoopType[]}
 */
const subLoopTypes = ["loop", "selection"]

/**
 * 
 * @param {SubLoopType?} subloopType 
 */
function getSubLoopTypeId(subloopType) {
    const _subLoopType = subloopType || "loop"
    return String(subLoopTypes.indexOf(_subLoopType))

}

/**
 * 
 * @param {string} id 
 */
function getSubLoopType(id) {
    return subLoopTypes[parseInt(id)];
}

module.exports = { getSubLoopType, getSubLoopTypeId }