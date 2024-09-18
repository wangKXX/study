var chunk = function(arr, size) {
  const res = [];
  const chunks = Math.floor(arr.length / size)
  for (let i = 0; i < chunks; i++) {
      res[i] = arr.slice(i*size, i*size + size)
  }
  if (arr.length % size) {
      res[chunks] = arr.slice(`-${arr.length % size}`)
  }
  return res;
};

const arr = [1,9,6,3,2]

console.log(chunk(arr, 3))