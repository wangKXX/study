/**
 * Object.is 和 === 的区别
 * 1. Object.is(NaN, NaN) === true;
 * 2. Object.is(0, -0) === false;
 * 3. NaN === NaN false;
 * 4. -0 === 0 true;
 *
 * Object.is 和 == 的区别
 * 1. == 隐式类型转换
 */
const baseNumberValueOf = Number.prototype.valueOf;
const baseNumberToString = Number.prototype.toString;
Number.prototype.valueOf = function (...args) {
  console.log("[number valueOf]");
  return baseNumberValueOf(args);
};

Number.prototype.toString = function (...args) {
  console.log("[number valueOf]");
  return baseNumberToString(args);
};

const baseStringValueOf = Number.prototype.valueOf;
const baseStringToString = Number.prototype.toString;
String.prototype.valueOf = function (...args) {
  console.log("[string valueOf]");
  return baseStringValueOf(args);
};

String.prototype.toString = function (...args) {
  console.log("[string valueOf]");
  return baseStringToString(args);
};

const obj = {
  valueOf() {
    console.log("[obj valueOf]");
    return 1;
  },
  toString() {
    console.log("[obj toString]");
    return 1;
  },
};

Array.prototype[Symbol.toPrimitive] = function (...args) {
  console.log("[array toPrimitive]");
  return 1;
};

Array.prototype.valueOf = function (...args) {
  console.log("[array valueOf]");
  return 1;
};

Array.prototype.toString = function (...args) {
  console.log("[array toString]");
  return 1;
};

console.log([1, 2, 3] == true);

console.log('1' == true);

// 对象转换为基本类型 优先调用 Symbol.toPrimitive -> valueOf -> toString
