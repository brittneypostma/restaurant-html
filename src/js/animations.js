gsap.registerPlugin(CSSRule, ScrollTrigger)

gsap.from('.animate-down', {
  scrollTrigger: {
    trigger: '.animate-down',
    toggleActions: 'restart reset restart pause',
  },
  duration: 1,
  opacity: 0.5,
  y: '-10vh',
})


gsap.from('.animate-left', {
  scrollTrigger: {
    trigger: '.animate-left',
    toggleActions: 'restart reset restart pause',
  },
  duration: 1,
  opacity: 0,
  x: '100vw',
})

gsap.from('.fade-up', {
  scrollTrigger: {
    trigger: '.fade-up',
    toggleActions: 'restart reset reset pause',
  },
  duration: 1,
  opacity: 0,
  y: '10vh',
})
