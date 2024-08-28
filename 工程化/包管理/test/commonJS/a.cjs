let a = 1;

let obj = {
  name: 'obj'
}

function setA(val) {
  a = val;
}

function setObjName(name) {
  obj.name = name;
}

function setObj(payload) {
  obj = payload;
}

module.exports = {
a, setA, obj, setObjName, setObj
}