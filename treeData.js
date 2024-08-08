const treeData = [
  {
    id: 1,
    key: 1,
    value: 1,
    label: 1,
    children: [
      {
        id: 2,
        key: 1,
        value: 1,
        label: 1,
        children: [
          {
            id: 3,
            key: 1,
            value: 1,
            label: 1,
          },
          {
            id: 4,
            key: 1,
            value: 1,
            label: 1,
          },
        ],
      },
      {
        id: 5,
        key: 1,
        value: 1,
        label: 1,
        children: [
          {
            id: 6,
            key: 1,
            value: 1,
            label: 1,
          },
          {
            id: 7,
            key: 1,
            value: 1,
            label: 1,
          },
        ],
      },
    ],
  },
];

const parent = treeData.map(({ key, value, label }) => ({ key, value, label }));

function getChildren(treeData, pId) {
  let res = [];
  treeData.forEach(({ id, children }) => {
    if (id === pId) res = children;
    if (id !== pId && children?.length) res = getChildren(children, pId);
  });
  return res;
}

console.log(getChildren(treeData, 5));
