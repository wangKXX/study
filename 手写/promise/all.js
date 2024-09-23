var promiseAll = function (functions) {
  const len = functions.length;
  const res = new Array(len);
  let doneNums = 0
  return new Promise((res, rej) => {
      for (let i = 0; i < len; i++) {
          functions[i]().then((re) => {
              res[i] = re
              if (doneNums >= len - 1) {
                  return res(res)
              }
              doneNums++
          }).catch(error => {
              return rej(error)
          })
      }
  })

};

promiseAll([() => new Promise(resolve => setTimeout(() => resolve(5), 200))])
.then(res => console.log(res)).catch(e => console.log(e))