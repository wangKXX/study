/**
 * 实现一个函数，参数为多个函数返回一个函数，返回的函数执行时，依次执行参数函数
 */

function compose(...fns) {
  return function (...args) {
    return fns.reverse().reduce((acc, cur) => cur(acc), args);
  };
}

const toNumber = (num) => Number(num);
const toRound = (num)=> Math.round(num);
const toString = (num) => num.toString();
const number = compose(toString,toRound,toNumber)('4.67'); // 数字 5
console.log(typeof number);

// toNumber(toRound(toString('4.67')))
console.log(toNumber(toRound(toString('4.67'))))

console.log(Math.round('4.67'))