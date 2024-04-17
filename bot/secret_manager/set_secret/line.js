const { argparser } = require('../../util/argparser')
const { saveSecret } = require('../line/reader')


function main() {
    /**
     * @typedef {import('./line_message').LineArgv} lineArgv
     * @type {lineArgv}
     */
    const data = argparser()
    saveSecret(data, !!data.local)
}