/**
 * @description 类型判断方法相对来说比较准确的，但是可以通过修改原型上的Symbol.toStringTag属性对类型进行修改
 * @param {*} params
 * @returns
 */
function myTypeOf1(params) {
  return Object.prototype.toString
    .call(params)
    .slice(8, -1)
    .toLocaleLowerCase();
  // return typeof params
}
String.prototype[Symbol.toStringTag] = "666";

/**
 * @description typeof 方法无法区分null和对象以及包装类型（new Number(1)）,对于除对象和null外的类型都可以准确判断
 * @param {*} params
 * @returns
 */
function myTypeOf1(params) {
  return typeof params;
}

// function myTypeOf1(params) {
//   return params.prototype[Symbol.toStringTag];
// }

console.log(myTypeOf1(1));
console.log(myTypeOf1(new Number(1)));
console.log(myTypeOf1("1"));
console.log(myTypeOf1(new String("1")));
console.log(myTypeOf1(null));
console.log(myTypeOf1(undefined));
console.log(myTypeOf1(new Date()));
console.log(myTypeOf1(new RegExp()));
console.log(myTypeOf1(new Error()));
console.log(myTypeOf1(false));
console.log(myTypeOf1(Symbol()));
console.log(myTypeOf1(new Set()));
console.log(myTypeOf1(new Map()));
console.log(myTypeOf1(new WeakSet()));
console.log(myTypeOf1(new WeakMap()));
console.log(myTypeOf1(function () {}));
console.log(myTypeOf1(class {}));
console.log(myTypeOf1({}));
