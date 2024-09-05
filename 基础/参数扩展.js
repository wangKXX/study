function params(...args) {
  console.log(args);
}

params(1, 2, 3);


const mySet = new Set([1, 2, 3]);

console.log(mySet)

console.log(...mySet)

const obj = { a: 1, b: 2 };
Object.setPrototypeOf(obj, { c: 3 });

console.log(obj)


const obj2 = {...obj}