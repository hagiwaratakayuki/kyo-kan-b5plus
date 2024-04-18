const { argparser } = require('../../../util/argparser')
const { saveSecret } = require('../../line/reader')
const fs = require('fs/promises')

async function main() {
    /**
     * @typedef {import('./line_message').LineArgv} lineArgv
     * @type {lineArgv}
     */
    const data = argparser()
    data.privateKey = JSON.parse((await fs.readFile(data.privateKey)))
    await saveSecret(data, !!data.local)
}
main().then()