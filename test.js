class Functor {
    constructor(value) {
        this.value = value
    }
    map(fn) {
        return this.value ? new Functor(fn(this.value)) : null
    }
}

Functor.of = value => new Functor(value)

let funObj = Functor.of('字符串')
console.log(funObj);

let head = str => str[0]

let newFun = funObj.map(head)
console.log(newFun);

