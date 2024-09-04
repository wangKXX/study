function myReduce(arr, callback, initialValue) {
  let res = initialValue
  for(let i = 0; i < arr.length; i++) {
    res = callback(res, arr[i], i, arr)
  }
  return res
}