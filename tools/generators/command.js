const fs = require('node:fs/promises')
const { existsSync } = require('node:fs')
const path = require('node:path')
const projectConfigure = require('../config')
const ejs = require('ejs');

async function main() {

    const dirs = await fs.readdir(path.join(__dirname, '../command_templates/'))
    const proms = [];
    for (const dir of dirs) {
        proms.push(_exec(dir))





    }
    await Promise.all(proms)


}
async function _exec(dir) {
    const configureDirPath = '../command_templates/' + dir;
    const outputDirpath = path.join(__dirname, '../commands/' + dir)

    const { getConfig } = await import(configureDirPath + '/configure.js');
    /**
     * @type {import('../types/messages').Configration}
     */
    const config = getConfig(projectConfigure)
    try {

        console.dir(await fs.access(outputDirpath, fs.constants.F_OK))
    } catch (error) {

        await fs.mkdir(outputDirpath);

    }
    const proms = []
    for (const [shelltype, defaultName] of Object.entries({ 'cmd': 'cmd.ejs-template', "sh": 'linux.ejs-template' })) {
        const templateName = path.join(__dirname, configureDirPath, config[shelltype] || defaultName)
        const outputFileName = path.join(outputDirpath, 'command.' + shelltype)
        const prom = render(templateName, outputFileName, config.values)
        proms.push(prom)

    }
    Promise.all(proms)







}
async function render(templateName, outputFileName, data) {
    const template = await fs.readFile(templateName, { encoding: 'utf-8' })

    const result = ejs.render(template, data)
    await fs.writeFile(outputFileName, result)


}

main()
