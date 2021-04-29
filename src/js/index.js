// individual js files are exported and
// import everything here
import { loadProducts } from './load-products.js'
import toggleNav from './toggle-nav.js'
import toggleCart from './toggle-cart.js'
import handleSubmit from './form.js'

if (!window.location.href.match(/success/)) {
  //* load in products to html
  loadProducts()

  //* listen for form input
  const form = document.getElementById('subscribe')
  form.addEventListener('submit', handleSubmit)

  //* GSAP Animations *//
  gsap.registerPlugin(ScrollTrigger)

  ScrollTrigger.defaults({
    toggleActions: 'play complete none none',
  })

  gsap.from('.animate-down', {
    scrollTrigger: {
      trigger: '.animate-down',
    },
    duration: 1,
    opacity: 0.5,
    y: '-10vh',
  })

  gsap.from('.animate-left', {
    scrollTrigger: {
      trigger: '.animate-left',
    },
    duration: 1,
    opacity: 0,
    x: '100vw',
  })

  gsap.from('.animate-right', {
    scrollTrigger: {
      trigger: '.animate-right',
    },
    duration: 1,
    opacity: 0,
    x: '-100vw',
  })

  gsap.from('.fade-up', {
    scrollTrigger: {
      trigger: '.fade-up',
    },
    duration: 0.75,
    opacity: 0,
    y: '10vh',
  })
}

toggleNav()
toggleCart()
