class Event {
  constructor() {
    this.events = {};
  }

  isSame(type, fn) {
    return this.events[type].find(cb => cb === fn);
  }

  on(type, cb) {
    this.events[type] = this.events[type] || [];
    if (this.isSame(type, fn)) return;
    this.events[type].push(cb);
  }
  emit(type, ...args) {
    if (!this.events[type]) return;
    this.events[type].forEach(cb => {
      cb(args)
    })
  }
  off(type, fn) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter(cb => cb !== fn);
  }
  once(type, fn) {
    this.events[type] = this.events[type] || [];
    if (this.isSame(type, fn)) return;
    this.events[type].push(() => {
      fn();
      this.off(type, fn);
    });
  }
}