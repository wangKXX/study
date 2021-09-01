var solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
      let left = 1;
      let right = n;
      while(left < right) {
          let mid = parseInt((left + right) / 2); // left + 2right-left
          if (isBadVersion(mid)) {
              right = mid;
          } else {
              left = mid + 1;
          }
      }
      return left;
  };
};