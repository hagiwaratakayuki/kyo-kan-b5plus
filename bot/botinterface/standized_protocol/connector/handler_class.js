class RespnseMessageHandler {
    /**
     * @template T
     * @param {T} responseType 
     */
    constructor(responseType) {
        /**
         * @type {T}
         */
        this.responseType = responseType

    }
    exec(message, result) { }
}

module.exports = { RespnseMessageHandler }