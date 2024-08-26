// const assert = require("assert");
import assert from "assert";

const error = new TypeError("right must be an object");
const errorInfo = {
  name: "TypeError",
  message: "right must be an object",
};
/**
 * @description instanceof 是判定左侧对象的原型链上是够有右侧对象的原型（prototype）.
 * 右侧必须是构造函数或者class
 * @param {*} left 
 * @param {*} right 
 * @returns 
 */
function myInstanceOf(left, right) {
  if (typeof right !== "function") throw error;
  if (typeof left !== "object") return false;
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

function myInstanceOf2(left, right) {
  if (typeof right !== "function") throw error;
  if (typeof left !== "object") return false;
  let proto = Object.getPrototypeOf(left);
  if (proto === null) return false;
  if (proto === right.prototype) return true;
  return myInstanceOf2(proto, right);
}
class MyClass {}
// 测试用例
describe("myInstanceOf", function () {
  it("should return true for instances of built-in types", function () {
    assert.strictEqual(myInstanceOf(new Date(), Date), true);
    assert.strictEqual(myInstanceOf(new RegExp(), RegExp), true);
    assert.strictEqual(myInstanceOf(new Error(), Error), true);
  });

  it("should return true for custom classes and objects", function () {
    const instance = new MyClass();
    assert.strictEqual(myInstanceOf(instance, MyClass), true);

    function MyFunction() {}
    const funcInstance = new MyFunction();
    assert.strictEqual(myInstanceOf(funcInstance, MyFunction), true);
  });

  it("should return false for non-matching types", function () {
    assert.strictEqual(myInstanceOf(1, Number), false);
    assert.strictEqual(myInstanceOf("hello", String), false);
    assert.strictEqual(myInstanceOf(true, Boolean), false);
    assert.strictEqual(myInstanceOf(1, String), false);
    assert.strictEqual(myInstanceOf("hello", Number), false);
    assert.strictEqual(myInstanceOf(true, Date), false);
    assert.strictEqual(myInstanceOf(new Date(), RegExp), false);
    assert.strictEqual(myInstanceOf(new RegExp(), Error), false);
    assert.strictEqual(myInstanceOf(new Error(), MyClass), false);
  });

  it("should throw error for non-instance values", function () {
    assert.throws(() => myInstanceOf(1, 1), errorInfo);
    assert.throws(() => myInstanceOf("hello", "hello"), errorInfo);
    assert.throws(() => myInstanceOf(true, true), errorInfo);
    assert.throws(() => myInstanceOf(null, null), errorInfo);
    assert.throws(() => myInstanceOf(undefined, undefined), errorInfo);
  });
});

describe("myInstanceOf2", function () {
  it("should return true for instances of built-in types", function () {
    assert.strictEqual(myInstanceOf2(new Date(), Date), true);
    assert.strictEqual(myInstanceOf2(new RegExp(), RegExp), true);
    assert.strictEqual(myInstanceOf2(new Error(), Error), true);
  });

  it("should return true for custom classes and objects", function () {
    const instance = new MyClass();
    assert.strictEqual(myInstanceOf2(instance, MyClass), true);

    function MyFunction() {}
    const funcInstance = new MyFunction();
    assert.strictEqual(myInstanceOf2(funcInstance, MyFunction), true);
  });

  it("should return false for non-matching types", function () {
    assert.strictEqual(myInstanceOf2(1, Number), false);
    assert.strictEqual(myInstanceOf2("hello", String), false);
    assert.strictEqual(myInstanceOf2(true, Boolean), false);
    assert.strictEqual(myInstanceOf2(1, String), false);
    assert.strictEqual(myInstanceOf2("hello", Number), false);
    assert.strictEqual(myInstanceOf2(true, Date), false);
    assert.strictEqual(myInstanceOf2(new Date(), RegExp), false);
    assert.strictEqual(myInstanceOf2(new RegExp(), Error), false);
    assert.strictEqual(myInstanceOf2(new Error(), MyClass), false);
  });

  it("should throw error for non-instance values", function () {
    assert.throws(() => myInstanceOf2(1, 1), errorInfo);
    assert.throws(() => myInstanceOf2("hello", "hello"), errorInfo);
    assert.throws(() => myInstanceOf2(true, true), errorInfo);
    assert.throws(() => myInstanceOf2(null, null), errorInfo);
    assert.throws(() => myInstanceOf2(undefined, undefined), errorInfo);
  });
});
