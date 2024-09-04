class A {
  instance = null

  #name = 'A'
  constructor(name) {
    this.#name = name
  }

  getName() {
    return this.#name
  }

  go() {
    console.log(1)
  }
}

const instanceA = new A('a')

console.log(instanceA)




// 单例
const singleInstance = (function getInstance() {
  let instance = null;
  return function() {
    if(!instance) {
      instance = new A();
    }
    return instance;
  }
})()