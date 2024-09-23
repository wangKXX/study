var timeLimit = function (fn, t) {

  return async function (...args) {
      const { promise, resolve, reject } = Promise.withResolvers()
      let timer = setTimeout(() => {
          reject('Time Limit Exceeded')
          clearTimeout(timer)
      }, t)
      fn(...args).then(res => resolve(res)).catch(reject)
      return promise
  }
};

const fn = timeLimit(async (n) => { await new Promise(res => setTimeout(res, 100)); return n * n; },5)
fn(5).then(console.log)