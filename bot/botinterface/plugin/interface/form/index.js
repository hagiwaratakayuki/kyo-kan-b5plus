const { FORM_BUILDER_ID, Form } = require("./basic")
const { COMPONENTCONTROLLER_ID, FormComponentController } = require("./component")

/**
 * @type {import("../../../../kyo-kan/plugin_type").BuilderRegistartionDatas}
 */
const builders = {

}

builders[FORM_BUILDER_ID] = Form
builders[COMPONENTCONTROLLER_ID] = FormComponentController