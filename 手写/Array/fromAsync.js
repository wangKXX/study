import { is } from "../helper/index.js";

/**
 * @description fromAsync 与promis.all类似，最大的区别在于fromAsync是一个一个执行，promise.all 是并行执行
 * @param {*} params 
 * @param {*} mapFn 
 * @param {*} thisArgs 
 * @returns 
 */
async function myFromAsync(params, mapFn, thisArgs) {
  if (mapFn && !is(mapFn, "function")) {
    throw new TypeError("mapFn must be function");
  }
  const result = [];
  let index = 0;
  return new Promise(async (resolve, reject) => {
    try {
      for (let item of params) {
        item = await item;
        const temp = mapFn ? mapFn.call(thisArg, item, index) : item;
        result.push(temp);
        index++;
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

async function myFromAsync2(params, mapFn, thisArgs) {
  if (mapFn && !is(mapFn, "function")) {
    throw new TypeError("mapFn must be function");
  }
  const result = [];
  let index = 0;
  return new Promise(async (resolve, reject) => {
    try {
      for await (let item of params) {
        const temp = mapFn ? mapFn.call(thisArg, item, index) : item;
        result.push(temp);
        index++;
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

Object.setPrototypeOf(Array, { myFromAsync });

Array.myFromAsync(
  new Map([
    [1, 2],
    [3, 4],
  ])
).then((array) => console.log(array));
// [[1, 2], [3, 4]]

Array.myFromAsync(
  new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
).then((array) => console.log(array));
// [1, 2, 3]

Array.myFromAsync({
  length: 3,
  0: Promise.resolve(1),
  1: Promise.resolve(2),
  2: Promise.resolve(3),
}).then((array) => console.log(array));
// [1, 2, 3]
