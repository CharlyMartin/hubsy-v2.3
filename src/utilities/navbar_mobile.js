function navbarMobile() {
  // 1. Variables
  const button = document.querySelector('#menu-button');
  const cross = document.querySelector('#close-button');
  const navbar = document.querySelector('.navbar-mobile');

  // 2. Functions
  const open = () => navbar.classList.add('navbar-mobile-active');
  const close = () => navbar.classList.remove('navbar-mobile-active');

  // 3. Events
  button.addEventListener('click', open);
  cross.addEventListener('click', close);
}

export { navbarMobile };