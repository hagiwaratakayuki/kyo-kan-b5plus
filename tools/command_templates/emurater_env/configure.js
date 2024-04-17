/**
 * 
 * @param {import('../../types/messages').ProjectConfig} projectConfig 
 * @returns {import("../../types/messages").Configration}
 */
module.exports.getConfig = function (projectConfig) {
    const envValues = {

        DATASTORE_DATASET: projectConfig.projectId,
        DATASTORE_EMULATOR_HOST: 'localhost:8081',
        DATASTORE_EMULATOR_HOST_PATH: 'localhost:8081/datastore',
        DATASTORE_HOST: 'http://localhost:8081',
        DATASTORE_PROJECT_ID: projectConfig.projectId
    }
    const values = { envValues }


    return { values }
}
