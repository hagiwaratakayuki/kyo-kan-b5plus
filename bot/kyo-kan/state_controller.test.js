const assert = require('node:assert');
const { StateController } = require('./state_controller')
const { Saver, Loader } = require('./looploader/save_and_load');




/**
 * @typedef {import('./state_controller').StateResponse} StateResponse
 * @typedef {{isForwardToSub?:true subid?:any}} SubloopRequest
 * @typedef {[SubloopRequest, import('./context').Context]} MockArg
 * */



describe('Executer', function () {

    it('execute first', async function () {
        let mockBulderArgs;
        let inArgs;
        let outArgs;
        let waitArgs;
        let callBackName;
        let inCount = 0;
        /**
         * @type {{[k in import('./state_emitter').State]:{options: any, i18n: any, i18n:any}}}
         */
        let pluginArgs = {};
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
         * @type  {import('./plugin_type').Builder}  
         * 
         */
        function mockBulder(options, language, i18n) {
            mockBulderArgs = { options, language, language };
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
                    pluginArgs['in'] = { options, language, language }
                    inCount++
                    return ret;


                },
                forwardOut: function (...args) {
                    outArgs = args;
                    pluginArgs['out'] = { options, language, language }
                    return { mode: "forwardOut" };
                },
                wait: function (...args) {
                    callBackName = "wait"
                    pluginArgs['wait'] = { options, language, language }
                    return waitfunc(args)

                },
                waitTest: function (...args) {
                    callBackName = "waitTest"
                    pluginArgs['wait'] = { options, language, language }
                    return waitfunc(args)

                },
                returnFromSub: function (...args) {
                    isReturnFromSubCalled = true
                    pluginArgs['returnFromSub'] = { options, language, language }
                    return { mode: "returnFromSub" }
                }


            }

        }


        /**
         * @type {import('./looploader/base_type').DocumentLoader}
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

        assert(pluginArgs['in'].options.selectoption, 1)
        assert(res[0].state, 'returnFromSub');
        assert(res[1].state, 'forwardOut');

    });
    it('should works controll break', async function () {

        let mockBulderArgs;
        let inArgs;
        let outArgs;
        let waitArgs;
        let callBackName;
        let inCount = 0;
        /**
         * @type {{[k in import('./state_emitter').State]:{options: any, i18n: any, i18n:any}}}
         */
        let pluginArgs = {};
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
         * @typedef {import('./protocol').PlugInProtocol<any>} PlugInProtocol
         * @typedef {import('./protocol').PlugInBuilderProtocol<any, PlugInProtocol>} PluginBuilderProtocol
         */

        /**
         * 
         * @type {PluginBuilderProtocol}
         */
        function mockTestBulder(options, language, i18n) {
            mockBulderArgs = { options, language, language };


            return {

                in: function (...args) {

                    return {
                        state: 'forwardToSub',
                        callback: 'callback'


                    };


                },
                callback: function (...args) {
                    /**
                     * @type {StateResponse}
                     */
                    const ret = {
                        state: 'wait',
                        callback: 'test'
                    }
                    return ret
                },
                forwardOut: function (...args) {
                    outArgs = args;
                    pluginArgs['out'] = { options, language, language }
                    return { mode: "forwardOut" };
                },
                returnFromSub: function (...args) {
                    isReturnFromSubCalled = true
                    pluginArgs['returnFromSub'] = { options, language, language }

                    return { mode: "returnFromSub" }
                }


            }

        }
        /**
         * 
         * @type  {PluginBuilderProtocol}
         */
        function mockControllBreakBuilder(options, language, i18n) {
            return {
                in(...args) {
                    return {
                        state: 'wait'
                    }
                },
                wait(...args) {
                    return {
                        state: 'break'
                    }
                }

            }

        }

        /**
         * @type {import('./looploader/base_type').DocumentLoader}
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
                builder: mockTestBulder,
                options: { loop: 'foo', notMerge: true },
                documentLoader: mockDocumentLoader


            },
            'break': {
                builder: mockControllBreakBuilder
            }
        }
        saver.buildersRegistration(builderConfigMap);
        saver.addLoopStep('test', { loop: 1 })
        saver.startSubLoop('loop');
        saver.addLoopStep('break', { subloop: 1 });
        saver.endSubLoop();


        let jsonData = saver.toJSON()

        let loader = new Loader(true)
        loader.buildersRegistration(builderConfigMap);




        let controlller = new StateController(loader);
        let res = await controlller.run({}, { loader: jsonData });
        console.log(res)
        res = await controlller.run({})
        console.log(res)



    })

});
