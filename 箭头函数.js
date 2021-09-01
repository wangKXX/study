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

