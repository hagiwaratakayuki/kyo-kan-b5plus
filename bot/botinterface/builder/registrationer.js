/**
 *  @typedef {{name:string, pugin:any, documanet}}
 *  @param {import("../../kyo-kan/looploader/save_and_load").Brige} target
 *  @param {[{name:string, plugin:any}]} plugins
 *  @param {string?} namespace
 *  @param {string} [delimiter=":"]   
 */



function execRegistaration(target, plugins, namespace, delimiter = ":") {
    const isNamespaceExist = !!namespace
    for (const { name, plugin } of plugins) {
        const _name = isNamespaceExist ? namespace + delimiter + name : name
        target.builderRegistration(name, plugin)


    }



}