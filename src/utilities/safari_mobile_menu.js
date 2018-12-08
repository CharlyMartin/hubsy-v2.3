function safariFix() {
  // 1. Variables
  const menu = document.querySelector('.navbar-mobile-content');

  // 2. Functions
  if (window.navigator.vendor.includes('Apple')) {
    console.log('Viewport resized');
    menu.style.height = `${window.innerHeight}px`;
  }
  
  // 3. Events
  // document.addEventListener('resize', setHeight);
}

export { safariFix };