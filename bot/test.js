
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
class Test2 extends Test {

}

function Hoge() { }
console.log(Object.getPrototypeOf(Test2))
console.log(Object.getPrototypeOf(Test))
console.log(Object.getPrototypeOf(Hoge))