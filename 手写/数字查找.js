const str = '123erthjikl456,><0'

const findNumber = (str) => {
  let res = ''
  for(let s of str) {
    if (typeof +s === 'number' && !isNaN(s)) {
      res += s
    }
  }
  return res;
}

console.log(findNumber(str))

console.log(str.match(/\d/g))