const { Loader } = require('../kyo-kan/looploader/save_and_load')
const { StateController } = require('../kyo-kan/state_controller')
const { config } = require('./index')
const { defaulti18nFunc } = require('../kyo-kan/i18n/index')

describe('Executer', function () {

    it('execute scenario', async function () {
        const loader = new Loader(true, 'ja', {}, { i18n: defaulti18nFunc })
        loader.fromJSON(config)
        const controller = new StateController(loader)

        console.log((await controller.run({})))

        /**
         * @type {import('../botinterface/standized_protocol/requestype/basic').StandardizedRequestSelect}
         */
        const seconndRequest = {
            type: "select",
            select: 0


        }

    })
})