import { a, setA, obj, setObjName } from "./a.js";

let b = 20;
function setB() {
  b = 30;
}

// console.log('inner b', a)
// console.log(a);
// setA(50)
// console.log('inner b change', a)

console.log('inner b obj', obj)
setObjName('zhangsanb')
obj.name = 'zhangsanbself';
console.log('inner b  obj', obj)

export { b, setB };