// (){}[]

function isValid(s) {
  if (s.length % 2 !== 0) return false;
  const stack = [];
  s = s.replace(/\s/g, '')
  for (let char of s) {
    if (char === '(') {
      stack.push(')');
    } else if (char === '{') {
      stack.push('}');
    } else if (char === '[') {
      stack.push(']');
    } else if (!stack.length || stack.pop() !== char) {
      return false;
    }
  }
}