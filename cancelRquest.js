/**
 *
 * @param {*} promise
 * @param {*} token
 * @description 对于XMLHttpRequest的请求，可以通过AbortController.abort()取消请求
 * 对于fetch请求，可以通过AbortController.abort()取消请求
 */
function getWithCancel(promise, token) {
  Promise.race([
    promise,
    new Promise((resolve, reject) => {
      token.cancel = function (reason = "canceled") {
        reject(reason);
      };
    }),
  ]).catch((e) => console.log(e));
}
var abortController = new AbortController();
var signal = abortController.signal;
var token = {};
var promise = fetch("https://jsonplaceholder.typicode.com/todos/1", { signal });
getWithCancel(promise, token);
token.cancel();
abortController.abort();
