/**
 * @typedef {import("./syncronaizer_ptotocol").builderIdMap} builderIdMap
 * @typedef {import("./syncronaizer_ptotocol").beforeAfterHook} beforeAfterHook
 */

import { VPEUtil } from "./basic"

/**
 * 
 * @param {*} controller 
 * @param {builderIdMap} builderIdMap 
 */
export function synchronizeConfiguration(controller, view, parser, builderIdMap) {

    /**
     * @type {import("../../../../../kyo-kan/looploader/base_type").BuilderConfigMap}
     *  
     */
    const builders = {}
    builders[builderIdMap.view] = {
        builder: view
    }
    builders[builderIdMap.parser] = {
        builder: parser
    }
    builders[builderIdMap.controller] = {
        builder: controller
    }
    return { builders, scenarioGenerater: _scenarioGenerater.bind({ config: builderIdMap }) }



}
/**
 * @this {{config:builderIdMap}}
 * @param {import("./syncronaizer_ptotocol").VPEHook} hooks 
 */
function _scenarioGenerater(hooks) {
    let views = [].concat(hooks.view?.before || []).concat({ builder: this.config.view }).concat(hooks.view?.after || []);
    let parsers = [].concat(hooks.parser?.before || []).concat({ builder: this.config.parser }).concat(hooks.parser?.after || []);


    return VPEUtil(this.config.controller, views, parsers)

}

