let { a, setA, obj, setObjName, setObj } = require('./a.cjs');

// console.log('c source ',a);
// setA('ccc'); // 这里修改A并不会改变当前模块中a的值
// console.log('c change ',a);


console.log('c source obj', obj);

setObjName('objc'); // 这里修改obj的name当前导入的obj的name也会修改

console.log('c change name obj', obj);

setObj({
  name: 'objb',
  age: 18
}); // 这里通过导入的修改方法修改当前模块的obj的引用，不会修改当前导入的obj

console.log('c change link obj', obj);

// obj = { name: 'objcself' };

// console.log('c change link obj', obj);

const bModule = require('./b.cjs');

console.log('c isObjequal b.obj ', obj === bModule.obj);
console.log('c isObjequal b.setObjName ', setObjName === bModule.setObjName);
console.log('c isObjequal b.setObj ', setObj === bModule.setObj);

console.log('c bModule.obj ', bModule.obj);
console.log('c  b change obj', obj);