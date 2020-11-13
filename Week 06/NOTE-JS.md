## Number：
- js 中的数字类型是**双精度浮点数（double float）**，符合 IEEE 754 标准。
- float：意思是小数点可以来回浮动

### 表示方式：
把一个数字拆成它的指数（决定了浮点数表示的范围）和有效位数（决定了浮点数表示的精度）

1个符号位（0表示正数，1表示负数）+11个指数位 + 52个精度位，其中，每一位是一个 bit，可以是 0 或 1（二进制）。

0.1 + 0.2 ≠ 0.3 的问题根源就是10进制数字转换为二进制过程精度的缺失，以及相加和计算后的转换导致的精度缺失。

## String
Character：字符
Code Point：码点
Encoding：编码方式

### 1. 字符集：
- ASCLL：127个，包括26个大写字母，26个小写字母，0-9十个数字，制表符，特殊符号，换行符等控制字符。
- Unicode：划分片区，全 且 大
- UCS：0000 - FFFF
- GB：国标
  - GB2312
  - GBK
  - GB18030
- ISO-8859：没有中文
- BIG5：台湾会用

### 2. 编码方式：
- UTF-8：默认用一个字节表示一个字符，所有的 ASCLL 字符在 UTF-8 里面都是属于 ASCLL 字符
- UTF-16：默认用两个字节表示一个字符

## Boolean
两个值，true、false

## Object
### 1. 生活中的对象：
- 唯一性
- 用状态来描述对象
- 行为：状态的改变

### 2. 类：
- 归类：提取共性，抽象
- 分类：

### 3. js 中的 Object：
**形式**：{key: value}
- 属性用来描述状态以及行为
  - 属性名可以是 string、symbol
- 属性值：
  - 数据属性
    - value
    - writable
    - enumerable（影响 object.keys、forEach 等）
    - configurable（设置为false 则其他三箱均不可变）
  - 访问起属性
    - get
    - set
    - enumerable
    - configurable

**原型链**：当我们访问属性时，如果当前对象没有，则会沿着原型找原型对象是否有此名称的属性，而原型对象还可能有原型，因此，会有『原型链』这一说法。

这一算法保证了，每个对象只需要描述自己和原型的区别即可。

**Objecct API/Grammar**
- {}.[] Object.defineProperty 创建对象、访问属性、定义新属性、改变属性的特征值。（基本的面向对象能力）
- Object.create / Object.setPrototypeOf / Object.getPrototypeOf 基于原型的对象API
- new / class / extends 基于分类的方法去描述对象
- new / function / prototype 不建议使用


**分类**
- 宿主对象（host Objects）：由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。
- 内置对象（Built-in Objects）：由 JavaScript 语言提供的对象。
  - 固有对象（Intrinsic Objects ）：
    由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。
  - 原生对象（Native Objects）：
    可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。
  - 普通对象（Ordinary Objects）：
    由{}语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。
