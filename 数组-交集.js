const arr1 = [1,2,3,4];
const arr2 = [3,4,5,6];

function intersectionReduce(arr1, arr2) {
  return arr1.reduce((init, current) => {
    arr2.includes(current) && init.push(current);
    return Array.from(new Set(init));
  }, []);
}

function intersectionBatter(arr1, arr2) {
  const res = [];
  for (let i = 0; i < arr1.length; i++) {
    const current = arr1[i];
    arr2.includes(current) && res.push(current);
  }
  return Array.from(new Set(res));
}

function intersectionBest(arr1, arr2) {
  const tempMap = {};
  const res = [];
  for (let i = 0; i < arr1.length; i++) {
    tempMap[arr1[i]] = true;
  }
  for (let i = 0; i < arr2.length; i++) {
    if (tempMap[arr2[i]]) res.push(arr2[i]);
  }
  return Array.from(new Set(res));
}
console.log(intersectionBest(arr1, arr2));