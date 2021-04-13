// * Listen for cart open and close
const cart = document.querySelector('#cart')
const back = document.querySelector('#back')
const cartItems = document.querySelector('#cart-items')

cart.addEventListener('click', () => {
  cartItems.classList.toggle('hidden')
})
back.addEventListener('click', () => {
  cartItems.classList.toggle('hidden')
})

// * Use Shopping Cart
const testApiKey = process.env.STRIPE_PUBLISHABLE_KEY
let store = UseShoppingCartCore.createShoppingCartStore({
  stripe: testApiKey,
  mode: 'client-only',
  successUrl: 'https://success.html',
  cancelUrl: 'https://index.html',
})

let persistor = UseShoppingCartCore.createPersistedStore(store)

const {
  addItem,
  checkoutSingleItem,
  clearCart,
  decrementItem,
  handleCartClick,
  handleCloseCart,
  incrementItem,
  redirectToCheckout,
  removeItem,
  formatCurrencyString,
} = UseShoppingCartCore.actions

let numberOfItems =
  Object.keys(JSON.stringify(store.getState().cartDetails)).length === 0
    ? JSON.stringify(store.getState().cartDetails)
    : 0

function render() {
  if (!store.getState().bootstrapped) {
    document.getElementById('cart-details').innerHTML = '?'
  }

  document.getElementById('cart-details').innerHTML = numberOfItems
}
render()

store.subscribe(render)

const noItems = document.getElementById('no-items')


if (cartItems.className === 'hidden' && numberOfItems === 0) {
  noItems.style.display = 'none'
  // const menu = document.querySelector('#menu')
  // const order = document.querySelector('#order')
  // const prices = await fetch('/.netlify/functions/get-products')
  //   .then(res => res.json())
  //   .catch(err => console.error(err))

  // prices.data.forEach(price => {
  //   menu.appendChild(createMenuTemplate(price))
  //   order.appendChild(createOrderTemplate(price))
  // })
} 
