const { FORM_BUILDER_ID, Form } = require("./basic")
const { COMPONENTCONTROLLER_ID, FormComponentController } = require("./component")
const { STANDARDIZED_REQUEST_PARSER, standardizedParser } = require("./parser/standardized")

/**
 * @type {import("../../../../kyo-kan/plugin_type").BuilderRegistartionDatas}
 */
const builders = {

}

builders[FORM_BUILDER_ID] = Form
builders[COMPONENTCONTROLLER_ID] = FormComponentController
builders[STANDARDIZED_REQUEST_PARSER] = standardizedParser
module.exports = builders