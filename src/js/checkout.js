// * Use Shopping Cart
const testApiKey =
  'pk_test_51H3WzVA5gnA92gtxXNCulxWBYSBrAt4xvuuYkv6Tp5uvlQl1ZPZj3uHIX0PNCSDjdP7eOv7o46nlKZzhuvoowggt00VRkn0FMf'
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

function loadCart() {
  let cartCount = store.getState().cartCount
  const itemCount = document.getElementById('item-count')
  const cartTitle = document.getElementById('cart-title')
  if (!store.getState().bootstrapped) {
    itemCount.innerHTML = '?'
  }
  if (cartCount === 0) {
    document.getElementById('cart-items').classList.add('hidden')
    cartTitle.innerHTML = `Oh the sadness, you don't have any ramen in your cart!`
    document.getElementById('cart-content').classList.add('content-center')
  }
  if (cartCount > 0) {
    cartTitle.innerHTML = `Your Order`
    document.getElementById('cart-items').classList.remove('hidden')
    document.getElementById('cart-content').classList.remove('content-center')
  }

  document
    .getElementById('checkout')
    .addEventListener('click', async function (e) {
      e.preventDefault()
      const cartDetails = store.getState().cartDetails
      const response = await fetch('/.netlify/functions/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartDetails),
      })
        .then(res => res.json())
        .catch(err => console.error(err))

      store.dispatch(redirectToCheckout({ sessionId: response.sessionId }))
    })

  loadItems()

  itemCount.innerHTML = cartCount
}

loadCart()

store.subscribe(loadCart)

function loadItems() {
  const orderDetails = document.querySelector('#order-details')
  const cartList = document.querySelector('#cart-list')
  const receipt = document.querySelector('#receipt')
  cartList.innerHTML = ''
  orderDetails.innerHTML = ''
  receipt.classList.add('hidden')
  const items = Object.keys(store.getState().cartDetails).map(
    item => store.getState().cartDetails[item]
  )
  items.forEach(item => {
    // *list of items in cart
    cartList.insertAdjacentHTML(
      'afterbegin',
      `
        <li
          class="grid gap-4 p-5 text-black bg-white border-t-4 border-solid rounded-sm shadow-2xl border-orange justify-stretch"
        >
          <div class="flex gap-4 justify-between">
            <h2 class="text-2xl text-left whitespace-nowrap lg:text-4xl">${
              item.name
            }</h2>
            <button onclick="store.dispatch(removeItem('${item.id}'))">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          </div>
          <div class="flex gap-4 justify-between">
            <p class="lg:text-2xl">Total: ${item.formattedValue} / $${(
        Math.round(item.price) / 100
      ).toFixed(2)} each</p>
      <div class="flex items-center">
              <button
                class="flex items-center justify-center w-8 h-8 text-3xl transition-colors bg-white border-2 border-solid cursor-pointer text-red border-red hover:bg-red hover:text-white"
                aria-label="remove one ${item.name} from cart"
                onclick="store.dispatch(decrementItem('${item.id}'))"
              >
                -
              </button>
              <label for="number"
                ><input
                  class="w-8 h-8 mx-5 text-2xl text-center text-white rounded-full bg-red font-heading"
                  type="number"
                  min="1"
                  value="${item.quantity}"
              /></label>
              <button
                class="flex items-center justify-center w-8 h-8 text-3xl transition-colors bg-white border-2 border-solid cursor-pointer text-red border-red hover:bg-red hover:text-white"
                aria-label="add one ${item.name} from cart"
                onclick="store.dispatch(incrementItem('${item.id}'))"
              >
                +
              </button>
            </div>
          </div>
        </li>
`
    )
    if (items.length > 0) {
      document.querySelector('#receipt').classList.remove('hidden')
      // *list of items in order details
      orderDetails.insertAdjacentHTML(
        'afterbegin',
        `
        <li
        class="pt-2 flex gap-4 items-start bg-white p-4 border-t-2 border-solid border-red justify-stretch justify-between text-black"
        >
          <div class="grid gap-4 w-full">
            <div class="flex justify-between">
              <h4 class="text-left whitespace-nowrap">${item.name}</h4>
              <p class="text-lg lg:text-2xl font-heading">${item.formattedValue}</p>
            </div>
            <p class="lg:text-2xl justify-self-end">Qty. ${item.quantity}</p>
          </div>
        </li>
`
      )

      // * total
      document.querySelector(
        '#total'
      ).innerHTML = store.getState().formattedTotalPrice
    }

    if (store.getState().cartCount === 0) {
      recept.classList.add('hidden')
    }
  })
}
