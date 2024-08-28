let a = 10;
let obj = {
  name: 'zhangsan'
}
function setA(value) {
  a = value;
}

function setObjName(value) {
  obj.name = value;
}

export { a, setA, obj, setObjName };