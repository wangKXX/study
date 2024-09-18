const testStr = 'ababa'

function isPalindrome(s) {
  const len = s.length
  let left = 0;
  let right = len - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      if ([','].includes(s[left])) {
        left++
        continue;
      } else if ([','].includes(s[right])) {
        right--
        continue;
      }
      return false

    }
    left++
    right--
  }
  return true
}

console.log(isPalindrome(testStr))