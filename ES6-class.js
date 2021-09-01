class A {
  instance = null
  constructor() {
    
  }

  go() {
    console.log(1)
  }
}

const singleInstance = (function getInstance() {
  let instance = null;
  return function() {
    if(!instance) {
      instance = new A();
    }
    return instance;
  }
})()