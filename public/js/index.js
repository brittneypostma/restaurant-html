// individual js files are exported and
// import everything here

import toggleNav from './toggle-nav.js'
import toggleCart from './toggle-cart.js'

toggleNav()
toggleCart()

//* Animations *//

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.defaults({
  toggleActions: "play complete none none"
});

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