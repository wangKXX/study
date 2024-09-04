var a = [1, [2,3, [4]]]
function myflat(arr) {
  let res = []
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      res.push(...myflat(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}

myflat(a)