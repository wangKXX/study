const arr = [1,5,3,6,2,0,8]

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let prevIndex = i - 1;
    let current = arr[i];
    while (prevIndex >= 0 && arr[prevIndex] > current) {
      arr[prevIndex + 1] = arr[prevIndex]
      prevIndex--;
    }
    arr[prevIndex + 1] = current;
  }

  return arr;
}

// prevIndex = 0 current = 5
// prevIndex = 1 current = 3

console.log(insertSort(arr));