function sortedSquares(nums) {
  let temp = [];
  let len = nums.length;
  for (let i = 0, j = len - 1, pos = len - 1; i <= j; ) {
    if (nums[i] > nums[j]) {
      temp[pos] = nums[i];
      ++i;
    } else {
      temp[pos] = nums[j];
      --j;
    }
    --pos;
  }
  return temp;
}

// console.log(sortedSquares([4, 5, 6, 3, 2,1]))




var rotate = function(nums, k) {
  let res = [];
  for(let i = 0, j = nums.length - 1; i <= j;) {
      if (k > 0) {
          res.unshift(nums[j]);
          j--;
          k--;
      } else {
          res.push(nums[i]);
          i++;
      }
      
  }
  return res;
};

console.log(rotate([1,2,3,4,5,6,7], 3))