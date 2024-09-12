/**
 * 给你一个对象实现loadsh
 * get方法
 */

function get(obj, path, defaultValue) {
  const paths = path.split('.');
  let result = obj;
  for (let i = 0; i < paths.length; i++) {
    if (!result) {
      return defaultValue;
    }
    result = result[paths[i]];
  }
  return result;
}