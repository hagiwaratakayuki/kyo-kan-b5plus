module.exports = function (project_id) {
    return {

        DATASTORE_DATASET: project_id,
        DATASTORE_EMULATOR_HOST: 'localhost:8081',
        DATASTORE_EMULATOR_HOST_PATH: 'localhost:8081/datastore',
        DATASTORE_HOST: 'http://localhost:8081',
        DATASTORE_PROJECT_ID: project_id
    }
}
