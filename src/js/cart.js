// * Listen for cart open and close
const cart = document.querySelector('#cart')
const close = document.querySelectorAll('#close')
const cartItems = document.querySelector('#cart-items')
const cartList = document.querySelector('#cart-list')

cart.addEventListener('click', () => {
  cartItems.classList.toggle('hidden')
})
close.forEach(btn => {
  btn.addEventListener('click', () => {
    cartItems.classList.toggle('hidden')
  })
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

const items = document.querySelector('#items')

const state = Object.keys(JSON.stringify(store.getState().cartDetails)) 
let numberOfItems =
  state.length === 0
    ? 0
    : state.length 


function render() {
  if (!store.getState().bootstrapped) {
    items.innerHTML = '?'
  }
  items.innerHTML = numberOfItems
}
render()

store.subscribe(render)

function loadCart() {
  const noItems = document.getElementById('no-items')

  if (cartItems.className === 'hidden' && numberOfItems === 0) {
    noItems.style.display = 'none'
    items.innerHTML = numberOfItems
  } else {
    items.innerHTML = numberOfItems
  }
}

loadCart()
