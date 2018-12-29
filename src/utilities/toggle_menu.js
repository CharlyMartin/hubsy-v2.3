function toggleMenu() {
  // 1. Variables
  const button = document.querySelector('#menu-button');
  const cross = document.querySelector('#close');
  const navbar = document.querySelector('.mobile');

  // 2. Functions
  const open = () => {
    navbar.classList.add('mobile-in');
    navbar.classList.remove('mobile-out');
  };
  
  const close = () => {
    navbar.classList.add('mobile-out');
    navbar.classList.remove('mobile-in');
  };

  // 3. Events
  button.addEventListener('click', open);
  cross.addEventListener('click', close);
}

export { toggleMenu };