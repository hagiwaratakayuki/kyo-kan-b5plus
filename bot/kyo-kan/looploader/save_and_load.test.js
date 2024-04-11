const assert = require('node:assert');
const { Saver, Loader } = require('./save_and_load')
/**
 * @template O
 * @template I
 * @typedef {{option:O, language:string, i18n:I}} mockRequest<O, I>
 */

describe('Save and Load', function () {

    it('Basic Flow', function () {
        let mockArg = { options: null, language: null, i18n: null }
        /**
         * 
         * @type {import('../plugin').Builder}
         */
        function mockBulder(options, language, i18n) {
            return {
                in: function () {
                    return { options, language, i18n }
                }
            }
        }
        /**
         * @type {import('./base_type').DocumentLoader}
         */
        const mockDocumentLoader = {
            title: function (language, options) {

            },
            description: function (language, options) {

            }
        };
        const saver = new Saver()
        const builderConfigMap = {
            'test': {
                builder: mockBulder,
                options: { loop: 'foo', notMerge: true },
                documentLoader: mockDocumentLoader


            }
        }
        saver.buildersRegistration(builderConfigMap);
        saver.addLoopStep('test', { loop: 1 })
        saver.addLoopStep('test', { loop: 2 })
        saver.startSubLoop('loop');
        saver.addLoopStep('test', { subloop: 1 });
        saver.addLoopStep('test', { subloop: 2 });
        assert.equal(saver.loopStepPath.length, 2);
        saver.endSubLoop();
        assert.equal(saver.loopStepPath.length, 1);
        saver.addLoopStep('test', { loop: 3 })
        saver.startSubLoop('selection');
        saver.addLoopStep('test', { selectoption: 1 });
        saver.addLoopStep('test', { selectoption: 2 });
        assert.equal(saver.loopStepPath.length, 2);
        saver.endSubLoop();
        assert.equal(saver.loopStepPath.length, 1);

        const jsonData = saver.toJSON()

        const newSaver = new Saver();
        newSaver.fromJSON(jsonData);

        assert.deepEqual(newSaver.toJSON(), jsonData)
        const loader = new Loader(true)
        loader.buildersRegistration(builderConfigMap);
        loader.fromJSON(jsonData);
        let step = loader.forward();


        assert.equal(step.now.options.loop, 1)

        step = loader.forward();

        assert.equal(step.now.options.loop, 2)
        assert.equal(step.now.subLoopType, 'loop')

        step = loader.forwardToSub()
        assert.equal(step.builderID, 'test');
        assert.equal(step.options.subloop, 1)

        step = loader.forward();
        assert.equal(loader.positionState.isEnd, false)
        assert.equal(step.now.options.subloop, 2)


        step = loader.forward();
        assert.equal(loader.positionState.isEnd, false)
        assert.equal(step.isSubLoopOut, true)
        assert.equal(step.now.options.loop, 2)

        step = loader.forward();
        assert.equal(loader.positionState.isEnd, true)
        assert.equal(step.isSubLoopOut, false)
        assert.equal(step.now.options.loop, 3)
        assert.equal(step.now.subLoopType, 'selection')
        step = loader.forwardToSub(1)
        assert.equal(step.builderID, 'test');
        assert.equal(step.options.selectoption, 2)
        step = loader.forward();
        assert.equal(loader.positionState.isEnd, true)
        assert.equal(step.isSubLoopOut, true)
        assert.equal(step.now.options.loop, 3)
    });

});