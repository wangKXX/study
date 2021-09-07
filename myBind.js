/**
 * 参数为arguments
 * @returns 
 */
Function.prototype.myBind = function() {
  const context = [].shift.call(arguments) || window || global;
  const args = [].slice.call(arguments);
  context.fn = this;
  return function() {
    const params = [...args, ...arguments];
    context.fn(...params);
  }
}

const obj = {
  a: 1
}

const testFun = function() {
  console.log(this.a)
  console.log(arguments);
}.bind(obj, 3, 4, 5)

const testFun1 = function() {
  console.log(this.a)
  console.log(arguments);
}.myBind(obj, 3, 4, 5)


console.log(testFun(1,2,3))
console.log(testFun1(1,2,3));