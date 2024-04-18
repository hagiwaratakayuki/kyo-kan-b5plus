
const path = require('node:path')
const fs = require('node:fs/promises')
const process = require('node:process');
IS_LOCAL = process.argv.length == 3






async function main() {
        const { execa } = await import('execa');
        const targetCwd = path.join(__dirname, '../../../bot/');
        const relPath = path.relative(targetCwd, path.join(__dirname, '../../../bot/secret_manager/tools/line/setdata.js')).replace(path.sep, '/')
        const commands = [relPath]
        /**
         * @type {import('../../../bot/secret_manager/tools/line/line_message').LineArgv}
         */
        const argV = JSON.parse((await fs.readFile(path.join(__dirname, '../../../secret/line/channel.json'), { encoding: 'utf-8' })))
        argV.privateKey = path.join(__dirname, '../../../secret/line/private.json')

        if (IS_LOCAL) {
                argV.local = 'local'
        }
        else {
                delete argV.accessToken
        }
        for (const keyValue of Object.entries(argV)) {
                commands.push(keyValue.join('='))
        }


        try {
                const { stdout } = await execa('node', commands, { cwd: targetCwd });
                console.log(stdout)

        } catch (error) {
                console.log(error)
        }




}

main()