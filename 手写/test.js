var debounce = function (fn, delay) {
  var timer = null;
  return function (args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

var throttle = function (fn, delay) {
  // 节流
  let timer = null;
  return function (args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
        clearTimeout(timer);
      }, delay);
    }
  };
};

var throttleNoTimer = function (fn, delay) {
  var timer = null;
  return function () {
    var now = new Date();
    if (!timer) {
      fn.apply(this, arguments);
      timer = now;
      return;
    }
    if (now - timer < delay) return;
    fn.apply(this, arguments);
    timer = now;
  };
};

var array = [1, 4, 3, 5];

function isLineArray(arr) {
  var maxNum = Math.max.apply(null, arr);
  var minNum = Math.min.apply(null, arr);
  var notLineItem = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (current === maxNum && arr.includes(current - 1)) continue;
    if (current === minNum && arr.includes(current + 1)) continue;
    if (arr.includes(current - 1) && arr.includes(current + 1)) continue;
    notLineItem.push(current);
  }
  return notLineItem;
}

function isLineArrayOn(arr) {
  var space = arr[0];
  for (let i = 0; arr.length; i++) {
    if (arr[i] - i !== space) {
      return arr[i];
    }
  }
}

function toLowerCase(str) {
  console.log(str.split(""));
  return str
    .split("")
    .map(s => {
      if (s.toUpperCase() === s) {
        return s.toLowerCase();
      }
      return s.toUpperCase();
    })
    .join("");
}

const arr = isLineArray(array);
// console.log(arr);

String.prototype.find = function (str) {
  let i = 0;
  let j = 0;
  if (!str.length) {
    return 0;
  }
  while (i < this.length && j < str.length) {
    if (this[i] === str[j]) {
      ++i;
      ++j;
    } else {
      i++;
      j = 0;
    }
  }

  if (j === str.length) {
    return i - j;
  } else {
    return -1;
  }
};

// console.log("456789123".find("5"));

class Factory {
  constructor() {
    this.current = 0;
    this.tasks = [];
  }

  add(promiseCreate) {
    if (this.current < 2) {
      this.current++;
      return this.run(promiseCreate);
    } else {
      return new Promise(reslove => {
        this.tasks.push(() => promiseCreate().then(reslove));
      });
    }
  }

  run(promiseCreate) {
    return promiseCreate().then(() => {
      this.current--;
      if (this.tasks.length) {
        this.run(this.tasks.shift());
      }
    });
  }
}

const promiseCreate = timer =>
  new Promise(reslove => setTimeout(reslove, timer));
const factory = new Factory();
const addTask = (timer, order) =>
  factory.add(() => promiseCreate(timer).then(() => console.log(timer, order)));



// addTask(1000, 1);
// addTask(500, 2);
// addTask(300, 3);
// addTask(400, 4);

// qs

function quiksort() {}


function precision(num) {
  return parseFloat(num.toPrecision(16));
}

// console.log(precision(0.1 + 0.2));


function precisionString(num1, num2) {
  const num1Str = String(num1).split(".");
  const num2Str = String(num2).split(".");
  const precision = Math.pow(10, Math.max(num1Str[1].length, num2Str[1].length));
 return (num1*precision + num2*precision) / precision;
}

// console.log(precisionString(0.1, 0.2));


function bigIntAdd(number1, number2) {
  const number1s = number1.split("");
  const number2s = number2.split("");
  // 补齐
  const space = number1s.length - number2s.length
  if(space) {
    var temp = [];
    temp.length = Math.abs(space);
    temp.fill("0");
    if (space > 0) {
      number2s.unshift(...temp);
    } else {
      number1s.unshift(...temp)
    }
  }
  console.log(number1s, number2s);
  let t = 0;
  let f = 0;
  let sum = "";
  for(let i = number1s.length - 1; i >= 0; i--) {
    t = parseInt(number1s[i]) + parseInt(number2s[i]) + f;
    f = Math.floor(t / 10);
    sum = t%10 + sum;
  }
  if(f == 1){
    sum = "1" + sum;
 }
  return sum;
}

// console.log(bigIntAdd("130", "18"));


Function.prototype.myBind = function(context) {
  if (typeof this !== "function") {
    throw new Error("type error")
  }
  const fn = this;
  const args = [...arguments].slice(1); // 保存自带参数

  return function Fn() {
    return fn.apply(this instanceof Fn ? new fn(arguments) : context, args.concat(...arguments));
  }
};

const obj = {
  test: "test"
}
function a(n, m) {
  console.log(this.test, arguments);
  return n + m;
}

// a.myBind(obj, 1, 2)()
// a.myBind(obj)(1, 2)



// function myNew(fn, ...args) {
//   const obj = {};
//   obj.__proto__ = fn.prototype;
//   const res = fn.apply(obj, args);
//   console.log(obj);
//   return res instanceof Object ? res : obj;
// }

function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype);
  console.log(obj);
  const res = fn.apply(obj, args);
  return res instanceof Object ? res : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function () {
  console.log(this.name)
}

// let p = myNew(Person, "huihui", 123)
// console.log(p) // Person {name: "huihui", age: 123}
// p.say() // huihui


class Events {
  constructor() {
    this.task = Object.create(null);
  }
  on(type, fn) {
    const callBack = this.task[type] || [];
    callBack.push(fn);
    this.task[type] = callBack;
    return this;
  }
  emit(type, args) {
    this.task[type].forEach(fn => fn(args));
    return this;
  }
  off(type, fn) {
    this.task[type] = this.task[type].filter(k => k !== fn);
    return this;
  }
  onceWrap(type, fn) {
    const warp =  args => {
      fn(args);
      this.off(type, warp);
    }
    return warp;
  }
  once(type, fn) {
    const wrap = this.onceWrap(type, fn);
    this.on(type, wrap);
    return this;
  }
}


const eventsInstance = new Events();

eventsInstance.on("eat", args => {
  console.log(`${args}吃饭`);
})
eventsInstance.on("eat", args => {
  console.log(`${args}喝水`);
})

eventsInstance.once("hit", args => {
  console.log(`${args}打人`);
})

eventsInstance.emit("eat", "我");

eventsInstance.emit("hit", "我");
eventsInstance.emit("hit", "你");
eventsInstance.emit("hit", "他");


Array.prototype._flat = function(deep) {
  if (!deep) {
    return this;
  }
  return this.reduce((v, c) => {
    if (Array.isArray(c)) {
      v.push(...c._flat(deep - 1));
    } else {
      v.push(c);
    }
    return v;
  }, []);
}

console.log([1, [2, [3, [4, [5, [6]]]]]]._flat(10));



var a = 5;

var b = {
  a: 4,
  getA: function() {
    a = 3;
    console.log(this.a);
  }
}

b.getA.call(b)


async function a() {
  const a = 4;
  a = 2
  return a
}

async function b() {
  console.log(1)
  await a();
  console.log(2)
}








