function forFun(m, n) {
  if (!m) return true;
  let i= 1;
  while(Math.pow(i, m) === n) {
    if (i > n) return false;
    ++i;
  }
  return true;
}

console.log(forFun(2, 4))

let i = 0;
function loopFun(m, n) {
  if (!m) return true;
  if (i > n) return false;
  if (Math.pow(i, m) === n) return true;
  ++i;
  return loopFun(m, n)
}

console.log(loopFun(2, 5))