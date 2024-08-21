

let single = (function singleInstance() {
  let instance = null;
  return function(fn) {
    !instance && (instance = new fn);
    return instance;
  }
})()


class A {};

const AInstance1 = single(A);
const AInstance2 = single(A);

console.log(AInstance1 === AInstance2)