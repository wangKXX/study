const isObject = obj => Object.prototype.toString.call(obj) === "[object Object]";
const isArray = obj => Array.isArray(obj);
const isAllObject = obj => typeof result === "object"

function observe(obj) {
  if (!(isObject(obj) || isArray(obj))) throw new Error("params is must a object");
  return new Proxy(obj, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      // 处理依赖
      return isAllObject(result) ? observe(result) : result;
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      return result;
    },
    deleteProperty(target, key) {
      return Reflect.deleteProperty(target, key);
    }
  })
}

