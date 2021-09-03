var test = (function() {
  const cache = {}
  return function (n) {
    if (n <= 1) return 1;
    if (n < 3) return n;
    if (!cache[n-1]) cache[n-1] = test(n-1);
    if (!cache[n-2]) cache[n-2] = test(n-2);
    return cache[n - 1] + cache[n - 2];
  }
})()


console.log(test(20))