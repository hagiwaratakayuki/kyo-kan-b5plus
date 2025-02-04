const { createComponentScenarioGenerater } = require("../form/component");
const { TextInputController } = require("./controller");
const { StanderdizedTextInputResponse: StandardizedResponse } = require("./view/standardized_textinput_response");

const VIEW = "StandaredizedTextResponse";
const CONTROLLER = "TextInputController";
const builders = {}
builders[CONTROLLER] = TextInputController
builders[VIEW] = StandardizedResponse
const scenarioGenerater = createComponentScenarioGenerater(CONTROLLER, VIEW)
module.exports = { builders, scenarioGenerater }