
/**
 * 
 * @param {Partial<import("../types/connector/handler").RespnseMessageHandlerType>[]} handlers 
 */
function BindHandler(handlers) {
    const ret = {}
    for (const handler of handlers) {
        ret[handler.responseType] = handler
    }
    return ret

}

module.exports = { BindHandler }