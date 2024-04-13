const path = require('node:path')
const process = require('node:process')
const fs = require('node:fs/promises')
const { generatePaire } = require("./logic")

/**
 * 
 * @param {string?} directry 
 * @param {string} privateKeyFileName 
 * @param {string} publicKeyFileName 
 */
async function saveFile(directry, privateKeyFileName = 'private.json', publicKeyFileName = 'public.json') {
    const _directry = directry || path.join(process.cwd(), 'secret');
    const privateKeyFile = path.join(_directry, privateKeyFileName);
    const publicKeyFile = path.join(_directry, publicKeyFileName);
    const { privateKey, publicKey } = await generatePaire();
    await fs.writeFile(privateKeyFile, privateKey);
    await fs.writeFile(publicKeyFile, publicKey);




}

module.exports = { saveFile }


module.exports = { saveFile }