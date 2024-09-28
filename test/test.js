const  arr = [
  {
    id: 1,
    val: "学校",
    parentId: null,
  },
  {
    id: 2,
    val: "班级1",
    parentId: 1,
  },
  {
    id: 3,
    val: "班级2",
    parentId: 1,
  },
  {
    id: 4,
    val: "学生1",
    parentId: 2,
  },
  {
    id: 5,
    val: "学生2",
    parentId: 3,
  },
  {
    id: 6,
    val: "学生3",
    parentId: 3,
  },
];

function arryToTree(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].parentId === null) {
      res.push(arr[i]);
    } else {
      for (let j = 0; j < arr.length; j++) {
        if (arr[i].parentId === arr[j].id) {
          arr[j].children = arr[j].children || [];
          arr[j].children.push(arr[i]);
        }
      }
    }
  }
  return res;
}

function arryToTree2(arr, id = null) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].parentId === id) {
      let children = arryToTree2(arr, arr[i].id);
      if (children.length) {
        arr[i].children = children;
      }
      res.push(arr[i]);
    }
  }
  return res;
}

function arryToTree3(arr, pid = null) {
  return arr.filter(({ parentId }) => parentId === pid).map(item => ({
    ...item,
    children: arryToTree3(arr, item.id)
  }))
}

console.log(arryToTree3(arr), arr);