const { exec } = require('child_process')


exec('echo テスト', function (...args) {

    console.dir(args)
})