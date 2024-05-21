
function abortAutomaton(functions, ...argments) {
    for (const func of functions) {
        const ret = func(...argments)
        if (typeof ret !== "undefined") {
            return ret;
        }

    }

}
module.exports = { abortAutomaton }