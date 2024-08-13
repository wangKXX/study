/**
 * @description 接口并发请求控制，每次运行并发阈值的请求，一个完成后立即执行下一个请求,将最终所有请求结果返回
 */
function manyFetchReturn(tasks, limit) {
  if (!Array.isArray(tasks)) {
    throw new Error("tasks must be an function array");
  }
  if (limit <= 0) {
    throw new Error("limit must be greater than 0");
  }
  if (tasks.length <= limit) {
    return Promise.all(tasks);
  }
  if (tasks.length === 0) {
    return Promise.resolve([]);
  }
  return new Promise((resolve) => {
    const results = [];
    // 当前正在运行的任务数量
    let runningTask = 0;
    // 当前正在运行的任务索引
    let currentIndex = 0;
    // 完成的任务数量
    let doneTasks = 0;
    const fetch = async () => {
      const index = currentIndex;
      runningTask++;
      currentIndex++;
      try {
        const res = await tasks[index]();
        results[index] = res;
      } catch (error) {
        results[index] = error;
      }
      runningTask--;
      doneTasks++;

      if (runningTask < limit && currentIndex < tasks.length) {
        fetch(tasks[currentIndex]);
      }
      if (doneTasks === tasks.length) {
        resolve(results);
      }
    };
    for (let i = 0; i < limit; i++) {
      fetch();
    }
  });
}

function fetchTest(i) {
  console.log(i, "start");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(i);
    }, (i + 1) * 1000);
  });
}

const testArr = [];
testArr.length = 50;
const tasks = testArr
  .fill(1)
  .map((_, index) => async () => await fetchTest(index));
manyFetchReturn(tasks, 5).then((res) => {
  console.log(res, "res");
});
