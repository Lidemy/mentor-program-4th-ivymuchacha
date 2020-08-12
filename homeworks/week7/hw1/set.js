const element = document.querySelector('.form');
element.addEventListener('submit', (e) => {
  const data = document.querySelectorAll('input');
  const alarm = document.querySelectorAll('.hidden');
  for (let i = 0; i < alarm.length; i += 1) {
    alarm[i].style.visibility = 'hidden';
  }
  let undo = false;
  for (let i = 0; i < 6; i += 1) {
    if (i < 3 && data[i].value === '') {
      alarm[i].style.visibility = 'visible';
      undo = true;
      e.preventDefault();
    } else if (i === 5 && data[5].value === '') {
      alarm[4].style.visibility = 'visible';
      undo = true;
      e.preventDefault();
    } else if (data[3].checked === false && data[4].checked === false) {
      alarm[3].style.visibility = 'visible';
      undo = true;
      e.preventDefault();
    }
  }
  if (undo === true) {
    e.preventDefault();
  } else if (undo === false && data[3].checked) {
    alert(`
    成功送出！
    暱稱為 ${data[0].value}
    電子郵件為 ${data[1].value}
    手機號碼為 ${data[2].value}
    報名類型為 躺在床上用想像力實作
    怎麼知道這個活動為 ${data[5].value}
    其他建議為 ${data[6].value}`);
  } else if (undo === false && data[4].checked) {
    alert(`
    成功送出！
    暱稱為 ${data[0].value}
    電子郵件為 ${data[1].value}
    手機號碼為 ${data[2].value}
    報名類型為 趴在地上滑手機找現成的
    怎麼知道這個活動為 ${data[5].value}
    其他建議為 ${data[6].value}`);
  }
});
