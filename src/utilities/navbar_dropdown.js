function navbarDropdown() {
  // 1. Variables
  const buttons = document.querySelectorAll('.with-dropdown');
  const dropdowns = document.querySelectorAll('.navbar-dropdown');

  // 2. Functions
  function closeOnLeave(element) {
    element.addEventListener('mouseleave', () => {
      element.classList.remove('dropdown-active');
    })
  }

  function open() {
    closeAll();
    // currentTarget = the element on which the event listener is attached;
    const dropdown = event.currentTarget.querySelector('.navbar-dropdown');
    dropdown.classList.add('dropdown-active');
    closeOnLeave(dropdown);
  }

  function closeAll() {
    dropdowns.forEach(d => d.classList.remove('dropdown-active'));
  }

  // 3. Events
  buttons.forEach(button => button.addEventListener('mouseenter', open));
  buttons.forEach(button => button.addEventListener('click', open));
  // Below does not work
  // document.body.addEventListener('click', closeAll);
}

export { navbarDropdown };