/**
 * @typedef {import("./base_type").SubLoopType} SubLoopType
 */

/**
 * @type {SubLoopType[]}
 */
const subLoopTypes = ["loop", "selection"]

/**
 * 
 * @param {SubLoopType} subloopType 
 */
function getSubLoopTypeId(subloopType) {
    return String(subLoopTypes.indexOf(subloopType))

}

/**
 * 
 * @param {string} id 
 */
function getSubLoopType(id) {
    return subLoopTypes[parseInt(id)];
}

module.exports = { getSubLoopType, getSubLoopTypeId }