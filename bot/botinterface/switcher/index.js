

class Switcher {

    constructor(handlers) {
        this.handlerClasses = handlers
    }
    run(request) {
        const event = this.getEvent(request)
        return this.handleSwitch(event, request)


    }
    /**
     * @param {string} event 
     */
    async handleSwitch(event, ...args) {
        /**
        * @type {import("../standized_protocol/switcher/handler_class.js").SwitcherHandler}
        */
        const handler = this.getHandler(event, ...args)
        return await handler.exec(...args) // TODO implement reswitch scenario




    }
    getHandler(event, ...args) {

        return new this.handlerClasses[event](...args)

    }
    /**
     * 
     * @param {any} request
     * @returns {string} 
     */
    getEvent(request) {

    }




}

module.exports = { Switcher }