/**
 * @description async 是generator的语法糖,之所以这么说是因为，async其实是一个自带co模块的generator函数。
 * generator函数可以理解为是一个状态机，yield表示状态，next表示下一个状态。
 * 最大特点是可以暂停函数执行。async函数是结合promise + generator + co模块实现的。
 * async函数本身返回值是一个Promise对象。起重的await类似于generator的yield方法。
 * 自动执行器触发next执行执行yield关键字后的（紧跟）表达式完成后函数进入暂停状态，控制权交由主线程。
 * async 在generator函数的基础上作了一些优化。
 * 包括返回值为promise。函数定义关键字采用async替代*，await替代yield。
 * yield关键字后面只能跟promise对象或者tnunk函数，await后面可以是promise对象或者原始数据类型(会被Promise.resolve处理)
 *
 * tnunk函数单一参数函数且参数只能是回调函数，任何函数只要参数有回调函数就能转换为thunk函数。
 *
 */
function* myAsync() {
  console.log("start");
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("1");
      resolve();
    }, 1000);
  });
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("2");
      resolve();
    }, 1000);
  });
}

/**
 * @description 模拟async/await -执行器 Promise实现
 */
function runWithPromise(fn) {
  const gen = fn();
  function step(val) {
    const res = gen.next(val);
    if (res.done) return res.value;
    res.value.then((val) => {
      step(val);
    });
  }
  step();
}

// runWithPromise(myAsync);

function* test() {
  console.log("1");
  yield console.log("2");
  console.log("3");
  yield console.log("4");
}

const testGen = test();

// testGen.next();
// testGen.next();
// 一定要有callback
function thunkify(fn) {
  return function () {
    const args = Array.prototype.slice.call(arguments);
    return function (cb) {
      args.push(cb);
      return fn.apply(this, args);
    };
  };
}
