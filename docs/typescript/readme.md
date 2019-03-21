# typescript

## 编译上下文(tsconfig.json)
    用来给文件分组，告诉 TypeScript 哪些文件是有效的，哪些是无效的。
    除了有效文件所携带信息外，编译上下文也包含了有哪些编译选项正在使用。
    定义这种逻辑分组，一个比较好的方式是使用 tsconfig.json 文件。
```

<script>
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [], // 指定要包含在编译中的库文件
    "allowJs": true, // 允许编译 javascript 文件
    "checkJs": true, // 报告 javascript 文件中的错误
    "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true, // 生成相应的 '.d.ts' 文件
    "sourceMap": true, // 生成相应的 '.map' 文件
    "outFile": "./", // 将输出文件合并为一个文件
    "outDir": "./dist", // 指定输出目录
    // "rootDir": "./src", // 用来控制输出目录结构 --rootdir.
    "removeComments": true, // 删除编译后的所有的注释
    "noEmit": true, // 不生成输出文件
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "isolatedModules": true, // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.
    /* 严格的类型检查选项 */
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'
    /* 额外的检查 */
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）
    /* 模块解析选项 */
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./", // 用于解析非相对模块名称的基目录
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。
    /* Source Map Options */
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性
    /* 其他选项 */
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
  },
  "include": [
    "./src"
  ],
  "exclude": [
    "./**/*.spec.ts",
    "./node_modules"
  ]
}
</script>
```

个人配置的tsconfig.json

```
<script>

{
  "compileOnSave": true,
  "compilerOptions": {
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "outDir": "./dist",
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "target": "es5",
    "removeComments": true, //删除编译后的所有的注释
    "declaration": true, //生成相应的 '.d.ts' 文件
    "moduleResolution": "node", //选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "experimentalDecorators": true, // 启用装饰器
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

  },
  "exclude": [
    "dist",
    "node_modules",
    "**/*.spec.ts"
  ],
  "include": [
    "src/**/*"
  ]
}
</script>
```

## 声明空间

    在 TypeScript 里存在两种声明空间：类型声明空间与变量声明空间。

### 类型声明空间

    类型声明空间包含用来当做类型注解的内容，例如以下的一些类型声明：

```
<script>
class Foo {}
interface Bar {}
type Bas = {};
</script>
```

    可以将 Foo, Bar, Bas 做为类型注解使用

```
<script>
let foo: Foo;
let bar: Bar;
let bas: Bas;
</script>
```

注意：**尽管你定义了 interface Bar，你并不能够将它做为一个变量使用，因为它没有定义在变量声明空间中**

### 变量声明空间

变量声明空间包含可用作变量的内容，在上文中 Class Foo 提供了一个类型 Foo 到类型声明空间，此外它同样提供了一个变量 Foo 到变量声明空间，如下所示：

```
class Foo {}
const someVar = Foo;
```

这个时候Foo作为一个变量，这个变量可以赋值给someVal

## 模块

### 全局模块

默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中。如在 foo.ts 里的以下代码：

```
const foo = 123;
```

如果你在相同的项目里创建了一个新的文件 bar.ts，TypeScript 类型系统将会允许你使用变量 foo，就好像它在全局可用一样：

```
const bar = foo; 
```

注意：**使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。**

### 文件模块

被称为外部模块。如果在你的 TypeScript 文件的根级别位置含有 import 或者 export，它会在这个文件中创建一个本地的作用域。因此，我们需要把上文 foo.ts 改成如下方式

```
export const foo = 123;
```

想在 bar.ts 里使用来自 foo.ts 的内容，你必须显式导入它，更新 bar.ts 如下所示：

```
import { foo } from './foo';
const bar = foo; 
```

### 文件模块详情

可以根据不同的 module 选项来把 TypeScript 编译成不同的 JavaScript 模块类型

* AMD：不要使用它，它仅能在浏览器工作；

* SystemJS：这是一个好的实验，已经被 ES 模块替代；

* ES 模块：它并没有准备好。

#### ES 模块语法

```
const someVar = 123;
type someType = {
  type: string;
};

export { someVar, someType };
```

重命名变量导出

```
const someVar = 123;
export { someVar as aDifferentName };
```

重命名变量导入

```
import { someVar as aDifferentName } from './foo';
```

除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面：

```
import * as foo from './foo';
```

从其他模块导入后整体导出：

```
export * from './foo';
```

默认导入／导出

```
export default function someFunction() {}
```

#### 模块路径

导入路径不是相对路径时，模块解析将会模仿 Node 模块解析策略

当你使用 import * as foo from 'foo'，将会在node_modules里面查找

#### place

* 如果这个 place 表示一个文件，如：foo.ts

* 如果这个 place 是一个文件夹，并且存在一个文件 foo/index.ts

* 如果这个 place 是一个文件夹，并且存在一个 foo/package.json 文件，在该文件中指定 types 的文件存在

* 如果这个 place 是一个文件夹，并且存在一个 package.json 文件，在该文件中指定 main 的文件存在

文件类型上来说，实际上是指 .ts， .d.ts 或者 .js

#### 重写类型的动态查找

在你的项目里，你可以通过 declare module 'somePath' 来声明一个全局模块的方式，用来解决查找模块路径的问题：
```
// globals.d.ts
declare module 'foo' {
  // some variable declarations
  export var bar: number;
}

```

## TypeScript 类型系统

### 基本注解

类型注解使用 :TypeAnnotation 语法。类型声明空间中可用的任何内容都可以用作类型注解。

```
const num: number = 123;
function identity(num: number): number {
  return num;
}
```

### 原始类型

```
let num: number;
let str: string;
let bool: boolean;

num = 123;
num = 123.456;
num = '123'; // Error

str = '123';
str = 123; // Error

bool = true;
bool = false;
bool = 'false'; // Error
```

### 数组

```
let boolArray: boolean[];

boolArray = [true, false];
console.log(boolArray[0]); // true
console.log(boolArray.length); // 2

boolArray[1] = true;
boolArray = [false, false];

boolArray[0] = 'false'; // Error
boolArray = 'false'; // Error
boolArray = [true, 'false']; // Error
```

### 接口

```
interface Name {
  first: string;
  second: string;
}

let name: Name;
name = {
  first: 'John',
  second: 'Doe'
};

name = {
  // Error: 'Second is missing'
  first: 'John'
};

name = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337
};
```

### 内联类型注解
创建一个接口不同，你可以使用内联注解语法注解任何内容
```
let name: {
  first: string;
  second: string;
};

name = {
  first: 'John',
  second: 'Doe'
};

name = {
  // Error: 'Second is missing'
  first: 'John'
};

name = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337
};

```

### 泛型

在一个函数中，它接受一个列表，并且返回这个列表的反向排序，这里的约束是指传入至函数的参数与函数的返回值：

```
function reverse<T>(items: T[]): T[] {
  const toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}

const sample = [1, 2, 3];
const reversed = reverse(sample);

console.log(reversed); // 3, 2, 1

// Safety
reversed[0] = '1'; // Error
reversed = ['1', '2']; // Error

reversed[0] = 1; // ok
reversed = [1, 2]; // ok
```

JavaScript 数组已经拥有了 reverse 的方法，TypeScript 也确实使用了泛型来定义其结构：

```
interface Array<T> {
  reverse(): T[];
}
```

### 交叉类型

```
function extend<T, U>(first: T, second: U): T & U {
  const result = <T & U>{};
  for (let id in first) {
    (<T>result)[id] = first[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<U>result)[id] = second[id];
    }
  }

  return result;
}

const x = extend({ a: 'hello' }, { b: 42 });

// 现在 x 拥有了 a 属性与 b 属性
const a = x.a;
const b = x.b;
```

### 元组类型

```
let nameNumber: [string, number];

// Ok
nameNumber = ['Jenny', 221345];

// Error
nameNumber = ['Jenny', '221345'];
```

TypeScript 中的解构一起使用

```
let nameNumber: [string, number];
nameNumber = ['Jenny', 322134];

const [name, num] = nameNumber;
```

### 类型别名

```
type StrOrNum = string | number;

// 使用
let sample: StrOrNum;
sample = 123;
sample = '123';

// 会检查类型
sample = true; // Error
```

## 参考

https://jkchao.github.io/typescript-book-chinese/