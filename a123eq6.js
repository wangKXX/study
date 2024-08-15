function a(params) {
  let count = params;
  function cacheFunction(args) {
    count += args;
    return cacheFunction;
  }

  cacheFunction.valueOf = function () {
    console.log("valueOf");
    return count;
  };

  cacheFunction.toString = function () {
    console.log("toString");
    return count;
  };

  cacheFunction[Symbol.toPrimitive] = function (hint) {
    console.log("toPrimitive");
    return count;
  };

  return cacheFunction;
}

console.log(a(1)(2)(3) == 6);
