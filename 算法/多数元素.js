var majorityElement = function(nums) {
  const map = new Map();
  for(let item of nums) {
      if (map.has(item)) {
        map.set(item, map.get(item) + 1)
      } else {
        map.set(item, 1)
      }
  }
  for (let [key, value] of map) {
      if (value > nums.length / 2) {
          return key
      }
  }

};

console.log(majorityElement([3,2,3]))