export default function toggleNav() {
  const toggle = document.querySelector('#nav-toggle')
  const nav = document.querySelector('#nav-menu')
  const ul = document.querySelector('#nav-list')

  toggle.addEventListener('click', () => {
    nav.classList.toggle('hidden')
    ul.classList.remove('h-0')
    ul.classList.add('h-screen')
    ul.classList.add('bg-opacity-90')
  })
}
