/**
 *  @param {import("../../types/messages").ProjectConfig} projectConfig
 *  @returns {import("../../types/messages").Configration}
 * */
module.exports.getConfig = function (projectConfig) {

    const values = { projectConfig }
    return { values, cmd: "template.ejs-template", sh: "template.ejs-template" }

}