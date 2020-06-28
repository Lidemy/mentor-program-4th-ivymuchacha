// 給定一字串，把第一個字轉成大寫之後「回傳」，若第一個字不是英文字母則忽略。
function capitalize(str) {
    let word = str[0];
    if ( word>='a' && word <='z'){
      return word.toUpperCase(0) + str.slice(1);
  } else {
      return str
  }
}

console.log(capitalize('hello'));