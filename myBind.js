Function.prototype.myBind = function(context, ...args) {
  context = context || window;
  context.fn = this;
  return function() {
    return context.fn(...args);
  }
}


const test = Object.prototype.toString.bind(null, [123]);

console.log(test())

const test1 = Object.prototype.toString.myBind(null, [123]);

console.log(test1());