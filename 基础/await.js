function test() {
  console.log("1");
}

function test1() {
  console.log("2")
  return new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, 3000)
  })  
}


async function test2() {
  console.log("0")
  await test1();
  await test();
}

test2();