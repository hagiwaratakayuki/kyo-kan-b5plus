


const pluginselect = require("../../botinterface/plugin/interface/select/pluginselect")

const builders = {}
//暫定
builders.execute = {
    builder: function () { }
}
builders.develop = {
    builder: function () { }
}
Object.assign(builders, pluginselect.getBuilder())

module.exports = { builders }