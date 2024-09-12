function myReduce(arr, callback, initialValue) {
  let res = initialValue
  for(let i = 0; i < arr.length; i++) {
    res = callback(res, arr[i], i, arr)
  }
  return res
}

const arr = [1, 2, 3];

const res = myReduce(arr, (pre, cur) => {
  if(cur >= 2) {
    pre.push(cur)
  }
  return pre
}, []);

console.log(res);

const a = arr.reduce((pre, cur) => {
  if(cur >= 2) {
    pre.push(cur)
  }
  return pre
}, [])

console.log(a);