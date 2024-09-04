# fetch 和 XMLHttpRequest 的区别
1. fetch 返回一个promise，XMLHttpRequest需要在回调中处理
2. fetch 通过监听reasponse.ok判断是否成功，XMLHttpRequest需要判断status（200）和readyState（4）来判断请求是否完成
3. fetch 需要使用abortController来取消请求，XMLHttpRequest需要使用abort方法
4. 从使用方式上fetch更简洁，XMLHttpRequest较为复杂
5. fetch 获取数据使用response.json(), response.text();XMLHttpRequest使用responseText或者获取response的属性
6. XMLHttpRequest无兼容性问题，fetch语法较新