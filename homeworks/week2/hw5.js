/*
join 會接收兩個參數：一個陣列跟一個字串，
會在陣列的每個元素中間插入一個字串，最後回傳合起來的字串。

repeat 的話就是回傳重複 n 次之後的字串。
*/

/*
function join(arr, concatStr) {
  var result='';
  for (i=0; i< arr.length; i++){
      if (i< arr.length-1){
          result = result + arr[i]+ concatStr;
      } else if (i === arr.length-1){
          result = result + arr[i];
      } else {
          return result;
      }
}
*/

function join(arr, concatStr) {
    var result='';
    for (i=0; i< arr.length; i++){
        if (i< arr.length-1){
            result = result + arr[i]+ concatStr;
        } else {
            result = result + arr[i];
        } 
    } return result;  
  }

function repeat(str, times) {
    var result='';
    for (i=1;i<=times;i++){
        if(i<= times){
        result = result + str
        } else {
            return result
        }
  } return result
}

console.log(join([1, 2, 3], ''));
console.log(join(["a", "b", "c"], "!"));
console.log(join(["a", 1, "b", 2, "c", 3], ','));
console.log(repeat('a', 5));
console.log(repeat('yoyo', 2));
