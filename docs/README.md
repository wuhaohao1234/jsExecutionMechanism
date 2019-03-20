# js执行机制

> 本文从数据结构的角度讲解js的执行机制

## js单线程

    首先明确一个概念:js是一门单线程语言,一切关于js中的多线程(例如:web-worker)都是由js模拟出来的

## js中的同步代码

    JavaScript 是一门单线程的语言，这意味着它只有一个调用栈，因此，它同一时间只能做一件事。

    调用栈是一种数据结构，它记录了我们在程序中的位置。
    如果我们运行到一个函数，它就会将其放置到栈低。
    当从这个函数执行结束返回的时候，就会将这个函数从栈顶弹出，这就是调用栈做的事情。
    下面看一段代码:

```
<script>
function fun() {
    console.log('fun函数执行')
}
fun()
</script>
```
这段代码做了以下几件事

1. 程序开始执行的时候，调用栈为空

2. 声明fun函数，此时将fun压入调用栈的栈顶

3. fun函数执行,调用栈将fun函数弹出

### 进阶执行上下文

    执行上下文是评估和执行 JavaScript 代码的环境的抽象概念。每当 Javascript 代码在运行(调用)的时候，它都是在执行上下文中运行。

* 全局执行上下文

    这是默认或者说基础的上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事：创建一个全局的 window 对象（浏览器的情况下），并且设置 this 的值等于这个全局对象。一个程序中只会有一个全局执行上下文。

* 函数执行上下文

    每当一个函数被调用时, 都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是在函数被调用时创建的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序（将在后文讨论）执行一系列步骤。

* Eval 函数执行上下文

     执行在 eval 函数内部的代码也会有它属于自己的执行上下文，但由于 JavaScript 开发者并不经常使用 eval，所以在这里我不会讨论它

#### 执行栈(上文中的调用栈)

执行栈，也就是在其它编程语言中所说的“调用栈”，是一种拥有 LIFO（后进先出）数据结构的栈，被用来存储代码运行时创建的所有执行上下文。

当 JavaScript 引擎第一次遇到你的脚本时，它会创建一个全局的执行上下文(global)并且压入当前执行栈。每当引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部。

引擎会执行那些执行上下文位于栈顶的函数。当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文。
```
<script>
let a = 'Hello World!';

function first() {
  console.log('Inside first function');
  second();
  console.log('Again inside first function');
}

function second() {
  console.log('Inside second function');
}

first();
console.log('Inside Global Execution Context');
</script>

```

* 当上述代码在浏览器加载时，JavaScript 引擎创建了一个全局执行上下文并把它压入当前执行栈。当遇到 first() 函数调用时，JavaScript 引擎为该函数创建一个新的执行上下文并把它压入当前执行栈的顶部。

* 当从 first() 函数内部调用 second() 函数时，JavaScript 引擎为 second() 函数创建了一个新的执行上下文并把它压入当前执行栈的顶部。当 second() 函数执行完毕，它的执行上下文会从当前栈弹出，并且控制流程到达下一个执行上下文，即 first() 函数的执行上下文。

* 当 first() 执行完毕，它的执行上下文从栈弹出，控制流程到达全局执行上下文。一旦所有代码执行完毕，JavaScript 引擎从当前栈中移除全局执行上下文。

##### 创建执行上下文

创建执行上下文有两个阶段：1) 创建阶段 和 2) 执行阶段。

1. 创建阶段(The Creation Phase)

    - this 值的决定，即我们所熟知的 This 绑定。

    在全局执行上下文中，this 的值指向全局对象。(在浏览器中，this引用 Window 对象)。

    在函数执行上下文中，this 的值取决于该函数是如何被调用的。如果它被一个引用对象调用，那么 this 会被设置成那个对象，否则 this 的值被设置为全局对象或者 undefined（在严格模式下）。

    总结:**this指向调用者**,但是函数的原型中的this指向他的constructor(实例化对象))

    - 创建词法环境组件。

    词法环境是一种持有标识符—变量映射的结构。（这里的标识符指的是变量/函数的名字，而变量是对实际对象[包含函数类型对象]或原始数据的引用）。

    在词法环境的内部有两个组件：(1) **环境记录器**和 (2) **一个外部环境的引用**。
        1. 环境记录器是存储变量和函数声明的实际位置。
        2. 外部环境的引用意味着它可以访问其父级词法环境（作用域）。

    词法环境有两种类型：

        全局环境（在全局执行上下文中）是没有外部环境引用的词法环境。全局环境的外部环境引用是 null。它拥有内建的 Object/Array/等、在环境记录器内的原型函数（关联全局对象，比如 window 对象）还有任何用户定义的全局变量，并且 this的值指向全局对象。

        在函数环境中，函数内部用户定义的变量存储在环境记录器中。并且引用的外部环境可能是全局环境，或者任何包含此内部函数的外部函数。

    环境记录器也有两种类型

        1. 声明式环境记录器存储变量、函数和参数。

        2. 对象环境记录器用来定义出现在全局上下文中的变量和函数的关系。

     **对于函数环境，声明式环境记录器还包含了一个传递给函数的 arguments 对象（此对象存储索引和参数的映射）和传递给函数的参数的 length。**

    - 创建变量环境组件。

    它同样是一个词法环境，其环境记录器持有变量声明语句在执行上下文中创建的绑定关系。
    在 ES6 中，词法环境组件和变量环境的一个不同就是前者被用来存储函数声明和变量（let 和 const）绑定，而后者只用来存储 var 变量绑定。

    变量声明与变量提升的原因:

    在创建阶段时，引擎检查代码找出变量和函数声明，虽然函数声明完全存储在环境中，但是变量最初设置为 undefined（var 情况下），或者未初始化（let 和 const 情况下）。
    这就是为什么你可以在声明之前访问 var 定义的变量（虽然是 undefined），但是在声明之前访问 let 和 const 的变量会得到一个引用错误。

2. 执行阶段

    在此阶段，完成对所有这些变量的分配，最后执行代码。

### 需要注意的地方

1. 每一个进入调用栈的都称为__调用帧__。

这能清楚的知道当异常发生的时候堆栈追踪是怎么被构造的，堆栈的状态是如何的。

下面的代码来个报错

```
function fun() {
     throw new Error('这里报了一个错误');
}
fun()
```

2. 堆栈溢出

    当我写一个死循环(递归)，会不停的将函数压入调用栈，然后再弹出调用栈会造成堆栈溢出

```
function foo() {
    foo();
}
foo();
```

    在某一时刻，调用栈中的函数调用的数量超过了调用栈的实际大小，浏览器决定干掉它，抛出一个错误
`Maximum call stack size exceeded`

## js中的异步

    虽然js是单线程的，但是这里面并没有说浏览器是单线程的(浏览器的渲染进程是多线程的)

### 浏览器内核（渲染进程）

#### GUI渲染线程

* 当界面需要重绘（Repaint）或由于某种操作引发回流(reflow)时，该线程就会执行

* GUI渲染线程与JS引擎线程是互斥的，当JS引擎执行时GUI线程会被挂起（相当于被冻结了），GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行。

#### JS引擎线程

    JS引擎一直等待着任务队列中任务的到来，然后加以处理，一个Tab页（renderer进程）中无论什么时候都只有一个JS线程在运行JS程序(js单线程的原因)

#### 异步

这里主要展开:[文档](https://segmentfault.com/a/1190000012925872)

1. 事件触发线程

2. 定时触发器线程

3. 异步http请求线程

4. web-worker(这个应该是属于浏览器的主线程开启的)

**但是终归一点js还是单线程的：上面的三种可以说和js引擎线程压根不是一个东西，它们可以通知js引擎线程去执行相应东西**

这里的异步说到底还是其它的线程去辅助js线程完成相应操作处理(牵扯到并发执行)

#### 结合promise

Promise里有了一个一个新的概念：microtask

或者，进一步，JS中分为两种任务类型：macrotask和microtask，在ECMAScript中，microtask称为jobs，macrotask可称为task

* macrotask（又称之为宏任务），可以理解是*每次*执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）

    - 每一个task会从头到尾将这个任务执行完毕，不会执行其它

    - 浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染

* microtask（又称为微任务），可以理解是在当前 task 执行结束后立即执行的任务

    - 在当前task任务后，下一个task之前，在渲染之前

    - 所以它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染

    - 某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）

* macrotask

    主代码块，事件队列中的每一个事件的回调函数

* microtask

    Promise，process.nextTicknode环境下，process.nextTick的优先级高于Promise__，也就是可以简单理解为：在宏任务结束后会先执行微任务队列中的nextTickQueue部分，然后才会执行微任务中的Promise部分。

## new 命令的原理

    使用new命令时，它后面的函数依次执行下面的步骤。

1. 创建一个空对象，作为将要返回的对象实例。

2. 将这个空对象的原型，指向构造函数的prototype属性。

3. 将这个空对象赋值给函数内部的this关键字。

4. 开始执行构造函数内部的代码。

构造函数内部，this指的是一个新生成的空对象，所有针对this的操作，都会发生在这个空对象上。构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即this对象），将其“构造”为需要的样子。

如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。

```
<script>
var Vehicle = function () {
  this.price = 1000;
  return 1000;
};
</script>
```

new Vehicle()得到Vehicle里面的空对象，而不是1000


```
<script>
function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return (typeof result === 'object' && result != null) ? result : context;
}

// 实例
var actor = _new(Person, '张三', 28);
</script>
```

## js面向对象编程: 构造函数的继承

### 构造函数绑定

```
function Animal(){
    this.species = "动物";
}
function Cat(name,age) {
    Animal.apply(this,arguments)
    this.name = name
    this.age = age
}
let cat = new Cat('狗',2)
```

### prototype

    通过prototype指向new Animal的实例对象

```
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```

### 利用空对象作为中介

```
function extend(Child, Parent) {
    var F = function(){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}
```