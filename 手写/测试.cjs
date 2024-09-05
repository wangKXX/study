console.log('start');  

setTimeout(() => {
  console.log('timeout');     
  process.nextTick(() => {
    console.log('nextTick');  
  });
}, 1000);

setImmediate(() => {
  console.log('immediate');   
});

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

process.nextTick(() => {
  console.log('nextTick');    
});

console.log('end');  

// timer 
// poll 
// check 

// 微 

// start 
// end
// nextTick
// immediate
// readFile
// immediate in readFile callback
// timeout in readFile callback
// timeout
// nextTick
