gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.defaults({
  toggleActions: "restart pause resume pause"
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
  duration: 1,
  opacity: 0,
  y: '10vh',
})
