/**
 * 1.创建一个原型对象指向obj的新对象
 * 2.判断返回值，返回值如果为对象则返回对象，如果死基本数据类型则返回创建的对象
 * 
 * @param {*} obj 
 * @param  {...any} args 
 * @returns 
 */

function myNew(obj, ...args) {
  const temp = Object.create(obj.property);
  const res = temp.apply(obj, args);
  return typeof res === "object" && res !== null ? res : temp;
}


function myNewProperty(obj, ...args) {
  const temp = {};
  temp.__proto__ = obj.property;
  const res = temp.apply(obj, args);
  return typeof res === "object" && res !== null ? res : temp;
}
