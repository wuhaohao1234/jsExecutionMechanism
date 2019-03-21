# 函数式编程

* 纯粹性: 纯函数不改变除当前作用域以外的值;

```
const add = (a, b) => a + b
```
* 数据不可变性: Immutable

```
const arr = [1, 2]
const arrAdd = (value) => {
  return arr.concat(value)
}
arrAdd(3) // [1, 2, 3]
arrAdd(3) // [1, 2, 3]
```
* 函数柯里化: 将多个入参的函数转化为一个入参的函数;

```
const add = a => b => c => a + b + c
add(1)(2)(3)
```

* 偏函数: 将多个入参的函数转化成两部分;

```
const add = a => (b, c) => a + b + c
add(1)(2, 3)
```

* 可组合: 函数之间能组合使用

```
const add = (x) => x + x
const mult = (x) => x * x
const addAndMult = (x) => add(mult(x))
```

## 柯里化(curry)

```
var add = (a, b, c) => a + b + c
function curry(fn, ...args) {
    const length = fn.length //获取fn传入的参数的个数
    let lists = args || []
    let listLen
    return function (..._args) {
        lists = [...args, ..._args] //这里将所有后面的参数合并到lists里面
        listLen = lists.length
        if(listLen < length) {
            const that = lists
            lists = []
            return curry(fn,...that)
        } else if (listLen === length) {
            const that = lists
            lists = []
            return fn.apply(this, that)
        }
    }
}
var curryAdd = curry(add)
```

## 代码组合(compose)

```

var toUpperCase = (str) => str.toUpperCase()
var reverse = (arr) => arr.reverse()
var head = (arr) => arr[0]
var compose = (...args) => (_args) => {
    args.forEach(arg => {
        try {
            _args = arg(_args)
        } catch (error) {
            console.error(_args + '不能传入' + arg)
        }
    })
    return _args
}

var reverseHeadUpperCase = compose(reverse, head, toUpperCase)
let str = reverseHeadUpperCase(['apple', 'banana', 'peach']) // PEACH
```

## 范畴论

范畴论是数学中的一个分支。可以将范畴理解为一个容器, 把原来对值的操作，现转为对容器的操作。

### 简单理解

1. 向函数fn传入一个值，返回一个新值，这是对于值的操作

2. 一个对象有一个对外暴露的of方法，可以返回一个new 这个对象的实例

3. 一个对象内部有个map方法可以返回另外一个new 这个对象的实例

4. 在函数式编程中禁止使用new 操作符

```
class Functor {
    constructor(value) {
        this.value = value
    }
    map(fn) {
        return new Functor(fn(this.value))
    }
}

Functor.of = value => new Functor(value)

let funObj = Functor.of('字符串')
console.log(funObj);

let head = str => str[0]

let newFun = funObj.map(head)
console.log(newFun);

```