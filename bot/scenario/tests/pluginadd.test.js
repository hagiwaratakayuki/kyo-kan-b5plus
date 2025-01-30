const { Loader } = require('../../kyo-kan/looploader/save_and_load')
const { StateController } = require('../../kyo-kan/state_controller')
const { config } = require('../index')


describe('add plugin', function () {

    it('is execute scenario', async function () {
        const loader = new Loader(true, '', {}, {})
        loader.fromJSON(config)
        const controller = new StateController(loader, 'ja')

        console.log((await controller.run({})))

        /**
         * @type {import('../../botinterface/standized_protocol/requestype/basic').StandardizedRequestSelect}
         */
        const seconndRequest = {
            type: "select",
            select: 0


        }

    })
})