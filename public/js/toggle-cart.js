
export default function toggleCart() {
  // * Listen for cart open and close
  const cartToggle = document.querySelector('#cart-toggle')
  const close = document.querySelectorAll('#close')
  const cart = document.querySelector('#cart')

  cartToggle.addEventListener('click', () => {
    cart.classList.toggle('hidden')
  })
  close.forEach(btn => {
    btn.addEventListener('click', () => {
      cart.classList.toggle('hidden')
    })
  })
}
