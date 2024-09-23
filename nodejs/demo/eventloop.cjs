// 微 
// timer 
// poll 
// check 
// start, promise, end, nextTick, then, timeout0, timeout1, nextTick1, readFile,
// immediate in readFile callback, timeout in readFile callback

console.log('start')

setTimeout(() => {
  console.log('timeout0')
}, 0)
setTimeout(() => {
  console.log('timeout1')
  process.nextTick(() => {
    console.log('nextTick1')
  })
}, 0)
process.nextTick(() => {
  console.log('nextTick')
})

const fs = require('fs');
fs.readFile(__filename, () => {
  console.log('readFile');    
  setImmediate(() => {
    console.log('immediate in readFile callback');
  });
  setTimeout(() => {
    console.log('timeout in readFile callback');
  }, 0);
});

new Promise((resolve) => {
  console.log('promise')
  resolve()
}).then(() => {
  console.log('then')
})

console.log('end')