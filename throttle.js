/**
 * setTimeout节流
 * 只有第一次被执行
 * @param {function} fn 
 * @param {number} delay 
 * @returns function
 */
//  function throttle(fn, delay) {
//   let timer = null;
//   return function() {
//     if (timer) return;
//     timer = setTimeout(() => {
//       fn(...arguments);
//       timer = null;
//     })
//   }
// } 

function test(a) {
  setTimeout(() => {
    console.log(a);
  }, 50) 
}
// const func = throttle(test, 300);

// func(1);
// func(2);
// func(3);

// function throttleNotSetTimeout(fn, delay) {
//   let date = new Date();
//   return function() {
//     const newDate = new Date();
//     console.log(newDate - date >= delay)
//     if (newDate - date >= delay) {
//       fn(...arguments);
//       date = newDate;
//     }
//   }
// }

// const func = throttleNotSetTimeout(test, 1);

// func(1);
// func(2);
// func(3);


function throttle(fn, delay, immediate = false) {
  let timer = null;
  return function() {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...arguments);
      timer = null;
    }, delay)
  }
}

const func = throttle(test, 200, true);


func(1)

func(2)

func(3)