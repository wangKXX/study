import { is } from "../helper/index.js";

function myFrom(params, mapFn, thisArg) {
  if (mapFn && !is(mapFn, "function")) {
    throw new TypeError("mapFn must be function");
  }
  const result = [];
  let index = 0;
  for (let item of params) {
    const temp = mapFn ? mapFn.call(thisArg, item, index) : item;
    result.push(temp);
    index++;
  }
  return result;
}

Object.setPrototypeOf(Array, { myFrom });

console.log(Array.myFrom("foo"));

console.log(Array.myFrom([1, 2, 3], (x) => x + x));
