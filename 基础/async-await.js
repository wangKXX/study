async function a() {
  return new Promise(res => {
    setTimeout(() => {
      res(1)
    }, 2000)
  })
}

async function b() {
  console.log(await a());
  console.log(2)
  console.log(3)
  console.log(4)
  console.log(5)
}

b();
/**
 * await 会阻塞后面代码的执行
 */