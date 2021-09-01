/**
 * 防抖
 * 只有最后一次执行
 * @param {function} fn 
 * @param {number} delay
 * @returns function
 */
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...arguments);
      timer = null;
    }, delay);
  };
}

function test(a) {
  console.log(a);
}
const func = debounce(test, 300);

func(1);
func(2);
func(3);