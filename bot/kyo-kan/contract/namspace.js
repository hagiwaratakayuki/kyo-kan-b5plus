/**
 * 
 * @param {string} namespace 
 * @param {import("../looploader/base_type").BuilderConfigMap} builderConfigMap 
 */
function NameSpaceRegistrater(namespace, builderConfigMap, namespaceKey = 'namespace', delimiter = ":") {
    const ret = {}
    for (const [name, config] of Object.entries(builderConfigMap)) {
        const namespaceConfig = {}
        namespaceConfig[namespaceKey] = namespace
        config.options = Object.assign({}, config.options || {}, namespaceConfig)

        ret[NameSpaceContract(namespace, name, delimiter)] = config
    }
    return ret
}

function NameSpaceContract(namespace, name, delimiter) {
    return namespace + delimiter + name
}

module.exports = { NameSpaceRegistrater, NameSpaceContract }