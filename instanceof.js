export function myInstanceOf(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}


export function myInstanceOf2(left, right) {
  let proto = Object.getPrototypeOf(left);
  if (proto === null) return false;
  if (proto === right.prototype) return true;
  return myInstanceOf2(proto, right);
}