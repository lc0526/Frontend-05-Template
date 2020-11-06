## 1. Proxy 与双向绑定：
### Proxy
> Proxy 是一个包含另一个对象或函数并允许你对其进行拦截的对象

**基本用法：**
```javascript
let object = {
  a: 1,
  b: 2
}

let po = new Proxy(object, {
  set() {
    // ...
  },
  get() {
    // ...
  }
})
```

Proxy 接收两个参数，需要监听的 object 对象，config 对象，可以重写需要监听的对象的各种方法。

### Vue3 中 Proxy 的使用

vue 3.x 开始使用 proxy 来实现双向数据绑定

```javascript
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop, receiver) {
    track(target, prop)
    return Reflect.get(...arguments)
  },
  set(target, key, value, receiver) {
    trigger(target, key)
    return Reflect.set(...arguments)
  }如果 Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截。
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)
```

**跟踪更改它的函数：** 我们在 Proxy 中的 getter 中执行此操作，称为 effect
**触发函数以便它可以更新最终值：** 我们在 Proxy 中的 setter 中进行该操作，名为 trigger

### Reflect 及使用：

1. Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。
2. 这些方法与proxy handlers的方法相同。Reflect不是一个函数对象，因此它是不可构造的。
3. Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。
4. 提供以下 13 个静态方法：
- Reflect.get(target, name, receiver)
  - 查找并返回 target 对象的name属性，如果没有该属性，则返回undefined。
  - 如果 name 属性部署了读取函数（getter），则读取函数的 this 绑定 receiver。
  - 如果第一个参数不是对象，Reflect.get方法会报错。
- Reflect.set(target, name, value, receiver)
  - 设置target对象的name属性等于value
  - 如果 name 属性部署了读取函数（getter），则读取函数的 this 绑定 receiver
  - 如果 Proxy 对象和 Reflect 对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了 receiver，那么 Reflect.set 会触发 Proxy.defineProperty 拦截。
  - 如果第一个参数不是对象，Reflect.set会报错。
- Reflect.has(target, name)
  - 对应 name in obj 里面的 in 运算符
- Reflect.deleteProperty(target, name)
  - 等同于 delete obj[name]，用于删除对象的属性
  - 该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回 true；删除失败，被删除的属性依然存在，返回 false
- Reflect.construct(target, args)
  - 等同于 new target(...args)，这提供了一种不使用 new，来调用构造函数的方法。
- Reflect.getPrototypeOf(target)
  - 用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)
- Reflect.setPrototypeOf(target, prototype)
- Reflect.apply(func, thisArg, args)
  - 等同于 Function.prototype.apply.call(func, thisArg, args)，用于绑定 this 对象后执行给定函数
- Reflect.defineProperty(target, name, desc)
  - 基本等同于 Object.defineProperty，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用 Reflect.defineProperty 代替它。
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.isExtensible(target)
  - 对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
- Reflect.preventExtensions(target)
  - 对应 Object.preventExtensions 方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
- Reflect.ownKeys(target)
  - 用于返回对象的所有属性，基本等同于 Object.getOwnPropertyNames 与 Object.getOwnPropertySymbols 之和。

[Reflect 用法详解](https://es6.ruanyifeng.com/#docs/reflect)

## 2. 双向绑定应用：
通过 proxy 可以做到监听属性变化，开发过程不再重点聚焦于页面变化，DOM 渲染，而是更关注数据变化，数据变化后带来的影响，更关注业务本身。

## 3. Range 及 cssOM 在项目里面的实际应用：
### Range
Range 接口表示一个包含 **节点** 与 **文本节点** 的一部分的文档片段

- 创建：Document.createRange()
- 设置 Range 的起点：Range.setStart()
- 设置 Range 的终点：Range.setEnd()
- 在 Range 的起点处插入一个节点：Range.insertNode()

### Element.getBoundingClientRect()
该方法返回元素的大小及其相对于视口的位置
返回值是一个 DOMRect 对象，
```javascript
let reac = element.getBoundingClientRect()
console.log(reac)
// reac = {
//   bottom: 140
//   height: 22
//   left: 685.28125
//   right: 685.296875
//   top: 118
//   width: 0.015625
//   x: 685.28125
//   y: 118
// }
```

这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合，就是该元素的 CSS 边框大小。
返回的结果是包含完整元素的最小矩形，并且拥有left, top, right, bottom, x, y, width, 和 height 这几个以像素为单位的只读属性用于描述整个边框。
除了width 和 height 以外的属性是相对于视图窗口的左上角来计算的。也是由于这个原因，在使用的时候不能暂存值，因为数值会随着浏览器窗口或者页面的大小变化进行变化。
