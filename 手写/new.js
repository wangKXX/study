function myNew(obj, ...args) {
  var temp = Object.create(obj.property);
  const res = temp.apply(obj, args);
  return typeof res === "object" && res !== null ? res : temp;
}