
class Test {
    constructor() {
        this.a = 1
        this.b = 2
    }
    hoge(fuga = []) {
        const [a = this.a, b = this.b] = fuga
        console.log(a)
        console.log(b)
    }
}

new Test().hoge()