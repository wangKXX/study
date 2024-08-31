const obj = {
  a: {
    b: 2
  }
}

const arr = [1,2,3];

const aProxy = new Proxy(obj, {
  get(target, key) {
    console.log('get :',target, key);
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    console.log('set: ',target, key, value);
    return Reflect.set(target, key, value);
  }
})

const arrProxy = new Proxy(arr, {
  get(target, key) {
    console.log('get :',target, key);
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    console.log('set: ',target, key, value);
    return Reflect.set(target, key, value);
  }
})

// aProxy.a.b = 3; // 无法监听嵌套类型，在vue3中会在get中进行判断，如果是引用数据类型则会将饮用数据类型进行proxy

// arrProxy[0] = 4; 可以对数组进行监听

arrProxy.push(4); // 可以对数组的方法进行监听


Object.defineProperty(arr, )