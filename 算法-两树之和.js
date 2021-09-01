const nums = [2, 7, 11, 5, 6];
const target = 9;


function sum(arr, target) {
  for(let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) return [i, j]
    }
  }
}

console.log(sum(nums, target));

function sumMap(arr, target) {
  const arrMap = new Map();
  let res = [];
  for(let i = 0; i < arr.length; i++) {
    arrMap.set(arr[i], i);
  }
  for (let [key, value] of arrMap) {
    const v = target - key
    if (arrMap.has(v)) {
      res = [value, arrMap.get(v)]
    }
  }
  return res;
}

console.log(sumMap(nums, target));