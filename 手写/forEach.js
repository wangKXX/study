Array.prototype.myForEach = function(fn) {
  const length = this.length;
  for (let i = 0; i < length; i++) {
    fn(this[i], i, this)
  }
}


const arr1 = [1, 2, 3];
arr1.myForEach((item, index) => {
  item++;
  console.log(item, index);
})

console.log(arr1);