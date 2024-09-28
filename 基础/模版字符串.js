function temp(...args) {
  console.log(args);
}
const name = 'too'
temp`hello ${1} world ${name}`;