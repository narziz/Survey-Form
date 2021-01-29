export function component() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello Webpack';
  element.classList.add('hello');
  return element;
 }
