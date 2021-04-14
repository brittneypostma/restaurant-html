// * Listen for cart open and close
const cart = document.querySelector('#cart')
const back = document.querySelector('#back')
const cartItems = document.querySelector('#cart-items')
const cartList = document.querySelector('#cart-list')

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


console.log(store.getState().cartDetails)

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
    document.querySelector('#items').innerHTML = '?'
  }

  document.querySelector('#items').innerHTML = numberOfItems
}
render()

store.subscribe(render)

// const product = {
//   name: "Bananas",
//   description: "Yummy yellow fruit",
//   id: "sku_J4vwzv3Z8kx5JD",
//   price: 400,
//   currency: "USD",
//   image: "https://my-image.com/banana.jpg",
// };

const noItems = document.getElementById('no-items')
// const addToCart = document.querySelectorAll('#addToCart')
// addToCart.forEach(btn => {
//   btn.addEventListener('click', () => {
//   store.dispatch(addItem(product))
// })
// })

if (cartItems.className === 'hidden' && numberOfItems === 0) {
  noItems.style.display = 'none'
} else {
  // const items =
}
