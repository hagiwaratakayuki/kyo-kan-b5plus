
async function test() {
    const prom = new Promise(function (res, rej) {
        setTimeout(function () {
            rej('hoge')



        })



    })
    try {
        await prom
    } catch (error) {
        console.log(error)
    }

}
test()
