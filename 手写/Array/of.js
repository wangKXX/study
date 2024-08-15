function myOf() {
  return [...arguments]
}

Object.setPrototypeOf(Array, { myOf })

console.log(Array.myOf('foo', 2, 'bar', true));
// Expected output: Array ["foo", 2, "bar", true]

console.log(Array.myOf());
// Expected output: Array []