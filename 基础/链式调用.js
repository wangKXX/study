class A {
  constructor() {
    this.status = "NORMAL";
    this.waitQueen = [];
  }
  log(params) {
    this.waitQueen.push(() => {
      console.log(params);
      this.run();
    });
    if (this.status === "WAIT") return this;
    this.run();
    return this;
  }
  run() {
    const next = this.waitQueen.shift();
    next && next();
  }
  wait(delay) {
    this.waitQueen.push(() => {
      this.status = "WAIT"
      setTimeout(() => {
        console.log("wait", delay);
        this.status = "NORMAL"
        this.run();
      }, delay);
    });
    if (this.status === "WAIT") return this;
    this.run();
    return this;
  }
}

new A().log(1).wait(1).wait(1).log(2).wait(0);
