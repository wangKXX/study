var nums = [1,2, 3 ];
var largestDivisibleSubset = function(nums) {
  nums = nums.sort((a, b) => a - b);
  var res = [];
  for(let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums.length; j++) {
        if (!(nums[j] % nums[i])) {
          res.push(nums[j]);
        }
      }
  }
  return res;
};

console.log(largestDivisibleSubset(nums));