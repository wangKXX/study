let s = "   fly me   to   the moon  ";


function lastWordLength(str) {
  str = str.trim();
  const strArray = str.split(" ");
  return strArray[strArray.length - 1].length;
}
console.log(lastWordLength(s));