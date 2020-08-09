const element = document.querySelectorAll('.form');
for (let i = 0; i < element.length; i += 1) {
  element[i].addEventListener('click', () => {
    const list = document.querySelectorAll('.form');
    list[i].classList.toggle('hidden');
  });
}
