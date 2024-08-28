let { a, setA, obj, setObjName, setObj } = require('./a.cjs');

console.log('b source obj', obj);

setObjName('objb');

console.log('b change name obj', obj);

setObj({
  name: 'objb',
  age: 18
});

console.log('b change link obj', obj);

// try {
//   a = 888;
// } catch (error) {
//   console.error(error);
// }


// console.log('b.js source', a);

// setA(2);

// console.log('b.js change', a);
let b = 1;
function setB(val) {
  b = val;
}
module.exports = {
b, setB, obj
}