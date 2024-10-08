/**
 * 
 * @param {*} arr 
 * @returns 
 * 最好情况O(nLogn)
 * 最坏情况O(n^2)
 */

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let midIndex = Math.floor(arr.length / 2);
  const left = [];
  const right = [];
  let midPoint = arr.splice(midIndex, 1)[0]; // 将中间位置直接拿出来
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < midPoint) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(midPoint, quickSort(right));
}

console.log(quickSort([5, 2, 4, 3, 8, 9, 1]));
