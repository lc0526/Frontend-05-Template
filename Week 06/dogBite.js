// 第一遍听讲解前的练习，抽象错了方法，狗咬人是业务逻辑，但是最终的结果是改变了人的状态，所以 bite 方法应该抽象到人身上对人的伤害 hurt
class Person {
  constructor(name) {
    this.name = name
  }
}

class Dog {
  constructor(name) {
    this.name = name
  }
  bite(person) {
    console.log(`${this.name}  bite ${person.name}`)
  }
}

const jack = new Person('Jack')
const wangwang = new Dog('wangwang')
wangwang.bite(jack)

// 重新修改的抽象为对人的伤害后
class Person {
  constructor(name, intact = 100) {
    this.name = name
    this.intact = intact
  }
  hurt(damage) {
    this.intact -= damage
    return this.intact
  }
}

class Dog {
  constructor(name) {
    this.name = name
    this.damage = 10
  }
  bite() {
    return this.damage
  }
}

const jack = new Person('Jack')
const wangwang = new Dog('wangwang')
jack.hurt(wangwang.bite())
