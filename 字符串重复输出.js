String.prototype.repeatify = function(num) {
  let tempArr = new Array(num);
  return tempArr.fill(this).join("");
}

console.log("hello".repeatify(4));