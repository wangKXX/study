console.log(1)

setTimeout(() => {
  console.log(2)
}, 0)
async function async1() {
  await Promise.resolve().then(() => {
    console.log(3)
  })
  console.log(4)
}
async1()
new Promise(function(resolve) {
  console.log(5)
  setTimeout(() => {
    resolve()
  }, 0)
  
}).then(function() {
  console.log(6)
})
 console.log(7)
 // 宏 
 // 微 6

 // 1 5 7 3 4 2 6