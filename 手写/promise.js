const PENDING = "pending";
// fulfuilled 成功回调
const FULFUILLED = "fulfuilled";
// rejected 失败回调
const REJECTED = "rejected";
class MyPromise {
  constructor(fn) {
    this.status = PENDING;
    this.value = undefined;
    this.error = undefined;
    this.resolveCbs = [];
    this.rejectCbs = [];
    this.catchCbs = [];
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.emitCatch(error);
    }
  }

  emitCatch(error) {
    const currentCb = this.catchCbs.shift();
    if (currentCb) currentCb(error)
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => {
      resolve(value);
    })
  }

  resolve(value) {
    if (this.status !== PENDING) return;
    this.value = value;
    this.status = FULFUILLED;
    const currentCb = this.resolveCbs.shift();
    if (currentCb) currentCb(this.value)

  }

  reject(reason) {
    if (this.status !== PENDING) return;
    this.error = reason;
    this.status = REJECTED;
    const currentCb = this.rejectCbs.shift();
    if (currentCb) currentCb(this.error)
  }

  then(onResolved, onRejected) {
    console.log("then")
    this.resolveCbs.push(onResolved);
    this.rejectCbs.push(onRejected);
    return this;
  }

  catch(fn) {
    this.catchCbs.push(fn);
    return this;
  }
}


// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(111);
//   }, 3000)
// }).then(value => {
//   console.log(value);
// }).catch(error => {
//   console.log(error, "catch");
// })

MyPromise.resolve(555).then(v => {
  console.log(v, 456);
})

Promise.prototype.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0;
    let result = [];
    for (let i = 0; i < promises.length; i++) {
      const item = promises[i];
      Promise.resolve(item).then(value => {
        count++;
        result[i] = value;
        if (count === promises.length) resolve(result)
      })
    }
  })
}