function navbarDropdown() {
  // 1. Variables
  const triggers = document.querySelectorAll('.with-dropdown');

  // 2. Functions
  function toggle() {
    const dropdown = this.querySelector('.navbar-dropdown');
    dropdown.classList.toggle('dropdown-active');
  }

  // function closeAll() {
  //   const dropdowns = document.querySelectorAll('.navbar-dropdown');
  //   dropdowns.forEach(d => d.classList.remove('trigger-opacity'));
  // }

  // 3. Events
  // triggers.forEach(t => t.addEventListener('click', closeAll));
  triggers.forEach(t => t.addEventListener('click', toggle));
}

export { navbarDropdown };