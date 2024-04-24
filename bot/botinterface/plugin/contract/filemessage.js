const fs = require('node:fs/promises')
const path = require('node:path')
const process = require('node:process')
const defaultDirectory = path.join(process.cwd(), './message')

function GenerateReader(namespace, directory = defaultDirectory) {
    return contract.bind({ namespace: path.join(directory, namespace) })
}

/**
 * @this {{namespace:string}}
 * @param {string} name 
 * @param {string} i18n 
 */
function contract(name, i18n = 'ja') {
    const filename = path.join(this.namespace, name + '.' + i18n)
    return fs.readFile(filename, { encoding: 'utf-8' })
}

module.exports = { GenerateReader }