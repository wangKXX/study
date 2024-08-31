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

function add(a, b, c) {
  return a + b + c
}

console.log(mycurry(add)(1)(2)(3))
console.log(mycurry(add)(1, 2)(3))