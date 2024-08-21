/**
 * 
 * @returns 
 */
Function.prototype.myCall = function() {
  const context = [].shift.call(arguments) || window || global;
  const args = [].slice.call(arguments);
  console.log(args, 'args')
  context.fn = this;
  return context.fn(...args);
}


function test() {
  console.log(arguments);
  console.log(this.name);
}

const obj = {
  name: 1
}

console.log(test.call(obj, 1,2,3));

console.log(test.myCall(obj, 1,2,3))