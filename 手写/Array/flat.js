var a = [1, [2,3, [4]]]
function myflat(arr, deep = 1) {
  if(deep <= 0) return arr
  let res = []
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      res.push(...myflat(arr[i], deep - 1))
    } else {
      res.push(arr[i])
    }
  }
  return res
}

console.log(myflat(a, 2))