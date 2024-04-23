const merge = require("deepmerge")
/**
 * 
 * @param {any} target 
 * @param  {...any} froms 
 */
function extendsFrom(target, ...froms) {
    froms.push(target)
    return merge.all(froms)

}