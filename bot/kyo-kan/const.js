/**
 * @type {import("./plugin_type").ExecuteState[]}
 */
const ExecuteStates = ["in", "wait"]
/**
 * @type {import("./plugin_type").MoveState[]}
 */
const MoveStates = ["back", "break", "continue", "forwardToSub", "forwardOut", "returnFromSub"]

module.exports = { ExecuteStates, MoveStates }