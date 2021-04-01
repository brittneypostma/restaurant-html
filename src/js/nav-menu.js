export default function toggleNav() {
  const toggle = document.querySelector('#nav-toggle')
  const nav = document.querySelector('#nav-menu')

  toggle.addEventListener('click', () => {
    nav.classList.toggle('hidden')
  })
}
