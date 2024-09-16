// 不能使用循环，或者第三方库

const arr = [1,2,3]

function sum(arr) {
  function next(index) {
    return index >= arr.length ? 0 : next(index + 1) + arr[index]
  }
  return next(0)
}

function sum2(arr) {
  return arr.reduce((a, b) => a + b)
}

console.log(sum(arr))