const arry = [
  { name: 'a', age: 1 },
  { name: 'a1', age: 1 },
  { name: 'b1', age: 2 },
  { name: 'b', age: 2 },
  { name: 'c', age: 3 },
  { name: 'd', age: 4 }
]

// find(array).where(/c/).groupBy('age', 'asc')

function find(arr) {
  return arr;
}

Array.prototype.where = function (reg) {
  return this.filter(item => reg.test(item.name))

}
// desc 降序 asc升序
Array.prototype.sortBy = function (key, type) {
  if (!['desc', 'asc'].includes(type)) throw new Error('type参数不正确')
  return this.sort((a, b) => type === 'asc' ? a[key] - b[key] : b[key] - a[key])
}

Array.prototype.groupByMy = function(key) {
  return this.reduce((acc, cur) => {
    acc[cur[key]] ||=[];
    acc[cur[key]].push(cur)
    return acc
  }, {})
}

// console.log(find(arry).where(/[a-z]/).groupBy('age', 'desc'))

// console.log(find(arry).where(/[a-z]/).groupBy('age', 'asc'))

// console.log(find(arry).where(/[a-z]/).groupByMy('age'))


class ArrayOperations {
  constructor(array) {
    this.array = array;
  }

  where(predicate) {
    this.array = this.array.filter(item => predicate.test(item));
    return this.chain();
  }

  groupBy(key, order) {
    // 创建一个空对象用于分组
    const grouped = {};

    // 分组逻辑
    this.array.forEach(item => {
      const keyValue = item[key];
      if (!grouped[keyValue]) {
        grouped[keyValue] = [];
      }
      grouped[keyValue].push(item);
    });

    // 根据 key 排序
    const keys = Object.keys(grouped);
    keys.sort((a, b) => {
      if (order === 'asc') {
        return a - b;
      } else if (order === 'desc') {
        return b - a;
      }
      return 0;
    });

    // 构建排序后的结果
    const sortedGrouped = {};
    keys.forEach(key => {
      sortedGrouped[key] = grouped[key];
    });

    return this.chain(sortedGrouped);
  }

  chain(result) {
    console.log(result);
    if (result !== undefined) {
      return result;
    }
    return this;
  }
}

// 示例使用
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'David', age: 35 },
  { name: 'Eve', age: 25 }
];

const result = new ArrayOperations(users)
  .where(/c/)
  // .groupBy('age', 'asc');

console.log(result);

