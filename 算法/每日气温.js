// 输入: [73, 74, 75, 71, 69, 72, 76, 73]
// 输出: [1, 1, 4, 2, 1, 1, 0, 0]
const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
function dailyTemperatures(temperatures) {
  const res = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    while(stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prev = stack.pop();
      res[prev] = i - prev;
    }
    stack.push(i);
  }

  return res;
}

console.log(dailyTemperatures(temperatures));