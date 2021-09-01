class Store {
  constructor() {
    this.created()
  }
  created() {
    this.initState();
  }
  initState() {
    this.state = {};
  }
  getState(key) {
    return Reflect.get(this.state, key);
  }
  setState(key, value) {
    return Reflect.set(this.state, key, value);
  }
  clear() {
    this.initState();
  }
}

let storeInstance = null;
function createStore() {
  if (storeInstance) return storeInstance;
  return new Store();
}

const instance = createStore();

instance.setState("test", 1);

console.log(instance.getState("test"));