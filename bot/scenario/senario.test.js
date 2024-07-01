const { Loader } = require('../kyo-kan/looploader/save_and_load')
const { StateController } = require('../kyo-kan/state_controller')
const { config } = require('./index')

describe('Executer', function () {

    it('execute scenario', async function () {
        const loader = new Loader(true, 'ja', {}, { i18n: function () { return "" } })
        loader.fromJSON(config)
        const controller = new StateController(loader)
        console.log((await controller.run({})))

    })
})