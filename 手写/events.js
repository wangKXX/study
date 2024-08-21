class Event {
  constructor() {
    this.eventMap = Object.create(null);
  }
  emit(type) {
    const eventList = this.eventMap[type];
    if (eventList) {
      eventList.forEach((fn) => {
        fn();
      });
    }
  }
  on(type, fn) {
    this.safeMap(type);
    this.eventMap[type].push(fn);
  }
  safeMap(type) {
    this.eventMap[type] || (this.eventMap[type] = []);
  }
  once(type, fn) {
    this.safeMap(type);
    const wrapFn = () => {
      fn();
      this.off(type, wrapFn);
    };
    this.eventMap[type].push(wrapFn);
  }
  off(type, fn) {
    this.eventMap[type] = this.eventMap[type].filter((item) => item !== fn);
  }
}

const eventInstance = new Event();

// eventInstance.on('test', () => {
//   console.log('test1');
// });

// eventInstance.on('test', () => {
//   console.log('test2');
// });

// eventInstance.on('test', () => {
//   console.log('test3');
// });

eventInstance.on("test6666", () => {
  console.log("test3");
});

eventInstance.once("test6666", () => {
  console.log("test once");
});

eventInstance.emit("test6666");

eventInstance.emit("test6666");
