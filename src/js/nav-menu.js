const menu = document.querySelector('.menu-icon')
const nav = document.querySelector('.nav-menu')

menu.addEventListener('click', () => {
  //Animate Links
  nav.classList.toggle('open-nav')

  //Hamburger Animation
  menu.classList.toggle('transform')
})
