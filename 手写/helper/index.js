export function is(obj, target) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLocaleLowerCase() === target.toLocaleLowerCase();
}