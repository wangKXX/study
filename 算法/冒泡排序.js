/**
 * 最好的情况O(n)
 * 最坏的情况O(n^2)
 * @param {*} arr 
 */
function sort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr;
}

console.log(sort([5, 10, 2, 4,11, 3, 8, 9, 1]));
// [5, 2, 4, 10,3, 8, 9, 1, 11]