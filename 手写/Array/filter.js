import { data } from "./data.js";

function myFilter(arr, fn) {
  const result = [];
  for(let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      result.push(arr[i])
    }
  }
  return result;
}

console.log(data.filter(i => i > 10))
console.log(myFilter(data, i => i > 10))