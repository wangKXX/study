const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

const arr1 = [
  [1, 2, 3, 4],
  [4, 5, 6, 7, 9],
  [7, 8, 9, 11, 10],
  [7, 8, 9, 10],
  [1, 2, 3, 4],
]

const arr2 = [
  [1, 2,],
  [5, 6,],
]

function outputItem(arr) {
  let len = arr.length;
  let isBack = false
  const res = [];
  for (let i = 0; i < len;) {
    const output = arr[i];
    if (i === 0) {
      output.forEach(element => {
        res.push(element)
      });
      arr[i] = undefined
      i++;
    }
    if (i > 0 && i < len - 1) {
      if (!isBack) {
        res.push(arr[i].pop())
        i++;
      }

      if (isBack) {
        res.push(arr[i].shift());
        if (i - 1 > 0) {
          i--
        } else {
          return res.concat(outputItem(arr.filter(item => item)))
        }
      }
    }

    if (i === len - 1) {
      output.reverse().forEach(element => {
        res.push(element)
      });
      arr[i] = undefined
      if (i - 1 > 0) {
        i--;
        isBack = true;
      } else {
        i++;
      }
    }
  }
  return res;
}


const arr3 = [
  [1, 2, 3, 4],
  [12, 13, 14, 5],
  [11, 16, 15, 6],
  [10, 9, 8, 7]]

const arr4 = [
  [1,11],
  [2,12],
  [3,13],
  [4,14],
  [5,15],
  [6,16],
  [7,17],
  [8,18],
  [9,19],
  [10,20]
]
const arr5 = [[7],[9],[6]]
function spiralArray(arr) {
  const cacheTemp = JSON.parse(JSON.stringify(arr))
  if (cacheTemp.length <= 1) return cacheTemp[0] || [];
  const first = cacheTemp.shift()
  const last = cacheTemp.pop().reverse()
  for (let i = 0; i < cacheTemp.length; i++) {
    const element = cacheTemp[i];
    element.length && first.push(element.pop())
  }
  for (let i = cacheTemp.length - 1; i >= 0; i--) {
    const element = cacheTemp[i];
    element.length && last.push(element.shift())
  }
  if (!cacheTemp.filter(item => item.length).length) return first.concat(last)
  return first.concat(last).concat(spiralArray(cacheTemp))
}

console.log(spiralArray(arr5))