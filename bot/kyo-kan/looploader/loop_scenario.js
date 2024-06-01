const { JSONSerializer } = require('../json_serializer')

class LoopScenario extends JSONSerializer {
    constructor() {
        this._loopScenario = []

        this.resetPosition()
    }
    resetPosition() {
        this._position = -1
    }
    moveTo(step) {
        let _step = step
        if (typeof step === 'undefined') {
            _step = 1
        }
        this._position += step


    }
    toJSON() {
        /**
         * @type {Array<keyof LoopScenario>}
         */
        const filters = ['_loopScenario']
    }


}

class LoopScenarios extends JSONSerializer {
    constructor() {
        this._loopScenarios
    }
}