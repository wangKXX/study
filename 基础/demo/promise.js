const ret = [];

let a = 3;

(function(a) {
  for(let i = 0; i < 3; i++) {
    const p = new Promise(resolve => resolve(i*a))
    ret.push(p);
  }
})(1)

Promise.all(ret).then(res => console.log(res))