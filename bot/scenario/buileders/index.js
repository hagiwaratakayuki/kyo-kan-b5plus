


const { getPluginSelectBuilder } = require("../../botinterface/plugin/interface/select/pluginselect")

const builders = {}
//暫定
builders.execute = {
    builder: function () { }
}
builders.develop = {
    builder: function () { }
}
Object.assign(builders, getPluginSelectBuilder())

module.exports = { builders }