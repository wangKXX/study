var a = 2;
const test = {
  a: 1,
  b() {
    console.log(this.a, this);
  }
}

var c = test.b;
c()

// function aw () {
//   this.a = 3;
//   return () => {
//     console.log(this.a, 789898)
//   }
// }
// var a = 5;
// var b = aw()
// b()
/**
 * 没有自己的this，而是继承了外层作用域的this，且不会随着函数调用而改变
 * 不能使用new
 * 没有arrguments
 * 不能当做生成器函数
 * 没有prototype
 * 只能是匿名函数
 * 
 */

