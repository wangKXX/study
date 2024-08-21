Function.prototype.myApply = function() {
  const context = [].shift.call(arguments);
  const args = arguments[0] || [];
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

console.log(test.apply(obj, [1,2,3]));

console.log(test.myApply(obj, [1,2,3]))