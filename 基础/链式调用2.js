class DOWait {
  constructor() {
    this.events = [];
  }
  do(str) {
    this.events.push(() => {
      console.log(`${str} do`)
    })
    return this;
  }
  wait(delay) {
    this.events.push(() => {
      console.log(`wait ${delay}秒`)
      return new Promise((res, rej) => {
        setTimeout(() => {
          res()
        }, delay*1000)
      })
    })
    return this;
  }
  async start() {
    for (let event of this.events) {
      await event();
    }
    this.events = [];
  }
}






let test = name => {
  console.log(`${name} start`);
  return new DOWait();
}

test("wangkai").do(1).wait(5).do(2).wait(3).do(3).start()