import { cloneDeep } from 'lodash-es'
const source = {
  a: 1,
  b: undefined,
  c: {
    d: null,
    // e: () => {},
    f: [1, 2, 3],
    // g: function () {},
    // h: Symbol('h'),
    i: new Date(),
    // j: class {},
    
  }
}
source.k = source

// 序列化

function cloneJson(source) {
  return JSON.parse(JSON.stringify(source))
}

// console.log(structuredClone(source))

// console.log(cloneDeep(source))

// console.log(cloneJson(source))

// const ls = new MessageChannel()

// const { port1, port2 } = ls

// port1.onmessage = (e) => {
//   console.log(source)
//   port1.close()
//   port2.close()
// }
// port2.postMessage(source)


function myClone(source) {
  let target = Array.isArray(source) ? [] : {}
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      let element = source[key]
      if (typeof element === 'object' && element !== source) {
        element = myClone(element)
      }
      if (element === source) {
        element = target
      }
      target[key] = element
    }
  }
  return target
}

console.log(myClone(source))