/**
 *
 * @param {*} count 并发请求数
 * @returns
 * @description 接口并发请求控制，每次运行并发阈值的请求，一个完成后立即执行下一个请求
 */
function fetchLimit(count) {
  let runingTasksCount = 0;
  const tasks = [];
  function request(fn, args) {
    return new Promise((resolve, reject) => {
      if (runingTasksCount < count) {
        fn(args)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            runingTasksCount--;
            if (tasks.length) {
              request(tasks.shift());
            }
          });
        runingTasksCount++;
      } else {
        tasks.push(() => fn(args).then(resolve).catch(reject));
      }
    });
  }
  return request;
}

const request = fetchLimit(3);

function fetchTest(i) {
  console.log(i, "start");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i);
    }, (i + 1) * 1000);
  });
}
async function test() {
  for (let i = 0; i < 10; i++) {
    request(fetchTest, i);
  }
}

test();
