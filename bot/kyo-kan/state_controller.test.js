const assert = require('node:assert');
const { StateController } = require('./state_controller')
const { Saver, Loader } = require('./looploader/save_and_load');




/**
 * @typedef {import('./state_controller').StateResponse} StateResponse
 * @typedef {{isForwardToSub?:true subid?:any}} SubloopRequest
 * @typedef {[SubloopRequest, import('./context').Context]} MockArg
 */
describe('Executer', function () {

    it('execute first', async function () {
        let mockBulderArgs;
        let inArgs;
        let outArgs;
        let waitArgs;
        let callBackName;
        let inCount = 0;
        /**
         * @type {{[k in import('./state_emitter').state]:{options: any, language: any, i18n:any}}}
         */
        let builderArgs = {};
        /**
         * 
         * @param {MockArg} args 
         * @returns 
         */
        function waitfunc(args) {
            waitArgs = args;
            /**
             * @type {StateResponse}
             */
            let response = {}

            if (args[0].isForwardToSub === true) {
                response.state = "forwardToSub"
                if (args[0].subid) {
                    response.subid = args[0].subid
                }

            }
            return response
        }
        let isReturnFromSubCalled = false
        /**
         * 
         * @type  {import('./plugin').Builder}  
         * 
         */
        function mockBulder(options, language, i18n) {
            mockBulderArgs = { options, language, i18n };
            const isWait = options.isWait
            const callback = options.callback

            return {
                in: function (...args) {
                    inArgs = args;
                    /**
                     * @type {StateResponse}
                     */
                    const ret = { state: "forwardOut", mode: 'in' };
                    if (isWait) {
                        ret.state = "wait"
                        ret.callback = callback
                    }
                    builderArgs['in'] = { options, language, i18n }
                    inCount++
                    return ret;


                },
                forwardOut: function (...args) {
                    outArgs = args;
                    builderArgs['out'] = { options, language, i18n }
                    return { mode: "forwardOut" };
                },
                wait: function (...args) {
                    callBackName = "wait"
                    builderArgs['wait'] = { options, language, i18n }
                    return waitfunc(args)

                },
                waitTest: function (...args) {
                    callBackName = "waitTest"
                    builderArgs['wait'] = { options, language, i18n }
                    return waitfunc(args)

                },
                returnFromSub: function (...args) {
                    isReturnFromSubCalled = true
                    builderArgs['returnFromSub'] = { options, language, i18n }
                    return { mode: "returnFromSub" }
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
        saver.addLoopStep('test', { loop: 2, isWait: true, callback: "wait" })
        saver.startSubLoop('loop');
        saver.addLoopStep('test', { subloop: 1 });
        saver.addLoopStep('test', { subloop: 2 });

        saver.endSubLoop();

        saver.addLoopStep('test', { loop: 3, isWait: true, callback: "wait" })
        saver.startSubLoop('selection');
        saver.addLoopStep('test', { selectoption: 1 });
        saver.addLoopStep('test', { selectoption: 2 });


        saver.endSubLoop();


        let jsonData = saver.toJSON()

        let loader = new Loader(true)
        loader.buildersRegistration(builderConfigMap);




        let controlller = new StateController(loader);
        let res = await controlller.run({}, { loader: jsonData });


        jsonData = controlller.toJSON()

        loader = new Loader()
        loader.buildersRegistration(builderConfigMap);
        controlller = new StateController(loader);
        inCount = 0
        res = await controlller.run({ isForwardToSub: true }, jsonData);//resume , wait here -> forword to sub -> run subloop  all -> return sub -> wait
        assert(inCount, 3)
        assert(controlller._emitter.getState(), "wait")



        /**
         * @type {SubloopRequest}
         */
        let mockRequest = { isForwardToSub: true, subid: 1 }

        res = await controlller.run(mockRequest);
        assert(builderArgs['in'].options.selectoption, 1)
        assert(res[0].state, 'returnFromSub');
        assert(res[1].state, 'forwardOut');

    });

});