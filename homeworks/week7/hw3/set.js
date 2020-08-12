function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const todo = document.querySelector('.list__tasks');
  const input = document.querySelector('input');
  const newTodo = document.createElement('div');
  if (input.value !== '') {
    todo.appendChild(newTodo);
    newTodo.classList.add('todo');
    console.log(input.value);
    newTodo.innerHTML = `
    <div class = "close"></div>
    <input class ="task" type ="checkbox" name = "task" />${escapeHtml(input.value)}`;
  }
  document.querySelector('.tasks').value = '';
});

document.querySelector('.list__tasks').addEventListener('click', (e) => {
  if (e.target.classList.contains('close')) {
    document.querySelector('.list__tasks').removeChild(e.target.closest('.todo'));
  }
});

document.querySelector('.list__tasks').addEventListener('click', () => {
  const num = document.querySelectorAll('.todo');
  const input = document.querySelectorAll('input');
  for (let i = 0; i < num.length; i += 1) {
    if (input[i + 1].checked === true) {
      num[i].classList.add('checked');
    } else {
      num[i].classList.remove('checked');
    }
  }
});
