var a = 4;

var b = {
  a: 5,
  getA: function () {
    a = 3;
    console.log(this.a);
  }
};

var c = b.getA;
c();

var a;
function a() {
  function a() {
    a = 4;
  }
  a();
  console.log(a);
  console.log(window.a)
}
a();
console.log(a);



// function a(){};
// a = undefined;

// function a() {
//   function a() {}
//   function a() {
//     a = 4;
//   }
//   a();
// }

