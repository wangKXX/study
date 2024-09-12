// a(1)(2)(3) == 6

function a(param) {
  let source = param
  function b(param) {
    source += param
    return b
  }
  b.valueOf = () => source;
  return b
}

console.log(a(1)(2)(3) == 6)

// curry
function mycurry(fn) {
  return function curry(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function(...args2) {
        return curry.apply(this, args.concat(args2))
      }
    }
  }
}

// mybindCurry
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function(...moreArgs) {
        return curried(...args, ...moreArgs);
      };
    }
  };
}

function multiply(x, y) {
  return x * y;
}

function add(x, y) {
  return x + y;
}

// 使用柯里化
const curriedMultiply = curry(multiply);
const curriedAdd = curry(add);

// 组合函数
const multiplyBy2AndAdd5 = curriedMultiply(2)(curriedAdd(5));

console.log(multiplyBy2AndAdd5(3)); // 输出 11

// function add(a, b, c) {
//   return a + b + c
// }

// console.log(mycurry(add)(1)(2)(3))
// console.log(mycurry(add)(1, 2)(3))