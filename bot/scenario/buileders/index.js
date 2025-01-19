


const { getPluginSelectBuilder } = require("../../botinterface/plugin/interface/select/pluginselect")

const builders = {}
Object.assign(builders, getPluginSelectBuilder())

module.exports = { builders }