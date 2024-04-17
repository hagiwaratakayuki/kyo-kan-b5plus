const path = require('node:path')
const process = require('node:process')
const fs = require('node:fs/promises')
const { generatePaire } = require("./logic")

/**
 * 
 * @param {string?} directry 
 * @param {string} privateKeyFileName 
 * @param {string} publicKeyFileName
 * @param {typeof fs} [_fs=fs]  
 */
async function saveFile(directry, privateKeyFileName = 'private.json', publicKeyFileName = 'public.json', _fs = fs) {
    const _directry = directry || path.join(__dirname, '../../../../secret/line');
    try {
        await _fs.access(_directry, fs.constants.F_OK)
    } catch (error) {
        await _fs.mkdir(_directry)

    }



    const privateKeyFile = path.join(_directry, privateKeyFileName);
    const publicKeyFile = path.join(_directry, publicKeyFileName);
    const { privateKey, publicKey } = await generatePaire();


    await _fs.writeFile(privateKeyFile, privateKey);
    await _fs.writeFile(publicKeyFile, publicKey);




}

module.exports = { saveFile }
