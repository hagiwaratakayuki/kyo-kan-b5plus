/**
 * 
 * @param {any} target 
 * @param {import("./protocol").BeforeAfterHook?} hooks 
 */
module.exports.beforeAfterHook = function (target, hooks) {
    return [].concat(hooks?.before || []).concat(target).concat(hooks?.after)
}