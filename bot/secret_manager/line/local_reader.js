
const path = require('node:path')
const fs = require('node:fs/promises');
/**
 * @typedef {import("./message").LineSecret} LineSecret
 */

const localSecretFile = path.join(__dirname, '../../../secret/line/local.json')
module.exports = { loadLocal, saveLocal }

async function loadLocal() {

    return JSON.parse((await fs.readFile(localSecretFile)))



}

async function saveLocal(data) {

    return await fs.writeFile(localSecretFile, JSON.stringify(data), { encoding: 'utf-8' })
}