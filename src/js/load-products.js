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

function loadCart() {
  let cartCount = store.getState().cartCount
  const itemCount = document.getElementById('item-count')
  const cartTitle = document.getElementById('cart-title')
  if (!store.getState().bootstrapped) {
    itemCount.innerHTML = '?'
    // cartContent.innerHTML = 'loading...'
  }
  if (cartCount === 0) {
    document.getElementById('cart-items').classList.add('hidden')
    cartTitle.innerHTML = `Oh the sadness, you don't have any ramen in your cart!`
  }
  if (cartCount > 0) {
    cartTitle.innerHTML = `Your Order`
    document.getElementById('cart-items').classList.remove('hidden')
  }

  loadItems()

  itemCount.innerHTML = cartCount
}
loadCart()

store.subscribe(loadCart)

function loadItems() {
  // document.querySelector('#cart-list').innerHTML = ''
  const items = Object.keys(store.getState().cartDetails).map(
    item => store.getState().cartDetails[item]
  )
  items.forEach(item => {
    console.log({item})
    const template = document.querySelector('#cart-list').insertAdjacentHTML(
      'afterbegin',
      `
        <li
          class="flex gap-4 p-5 items-start text-black bg-white border-t-4 border-solid rounded-sm shadow-2xl border-orange justify-stretch  justify-between"
        >
          <div class="grid gap-4">
            <h2>${item.name}</h2>
            <p>Quantity: ${item.quantity} / ${item.formattedValue} each</p>
          </div>
          <div class="grid justify-items-end h-full content-between">
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
            <div class="flex items-center">
              <button
                class="flex items-center justify-center w-8 h-8 text-3xl transition-colors bg-white border-2 border-solid cursor-pointer text-red border-red hover:bg-red hover:text-white"
                aria-label="remove one ${item.name} from cart"
                onclick=""
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
                onclick=""
              >
                +
              </button>
            </div>
          </div>
        </li>`
    )
    return template
  })
}

function getItemDetails(item) {
  return {
    name: item.product.name,
    description: item.product.description,
    id: item.id,
    price: item.unit_amount,
    currency: item.currency,
    image: item.product.images[0],
  }
}

function createMenuTemplate(item) {
  const template = document.querySelector('#menu-template')
  const menu = template.content.cloneNode(true)
  menu.querySelector('#name').innerText = item.product.name
  menu.querySelector('#desc').innerText = item.product.description
  menu.querySelector('#price').innerText = `$${(
    Math.round(item.unit_amount) / 100
  ).toFixed(2)}`
  menu.querySelector('#addToCart').addEventListener('click', () => {
    store.dispatch(addItem(getItemDetails(item)))
  })

  return menu
}

function createOrderTemplate(item) {
  const template = document.querySelector('#order-template')
  const order = template.content.cloneNode(true)
  const img = order.querySelector('img')
  img.src = item.product.images[0]
  img.alt = item.product.name

  order.querySelector('#name').innerText = item.product.name
  order.querySelector('#price').innerText = `$${(
    Math.round(item.unit_amount) / 100
  ).toFixed(2)}`
  order.querySelector('[name=sku]').value = item.id
  const form = order.querySelector('form')

  form.addEventListener('submit', handleFormSubmit)

  return order
}

async function loadProducts() {
  const menu = document.querySelector('#menu')
  const order = document.querySelector('#order')
  const prices = await fetch('/.netlify/functions/get-products')
    .then(res => res.json())
    .catch(err => console.error(err))

  prices.data.forEach(price => {
    menu.appendChild(createMenuTemplate(price))
    order.appendChild(createOrderTemplate(price))
  })
}

loadProducts()

async function handleFormSubmit(event) {
  event.preventDefault()
  const form = new FormData(event.target)

  const data = {
    sku: form.get('sku'),
    quantity: 1,
  }

  const response = await fetch('/.netlify/functions/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .catch(err => console.error(err))
  const stripe = await Stripe(response.publishableKey)

  const { error } = await stripe.redirectToCheckout({
    sessionId: response.sessionId,
  })

  if (error) {
    console.error(error)
  }
}

// must use single quotes in item when injecting to html
// const items = Object.entries(store.getState().cartDetails)
// let ids = []
// items.forEach(arr => {
//   for (let i = 0; i < arr.length; i += 2) {
//     let id = arr[i]
//     ids.push(arr[i])
//     arr.splice(i, 1)
//     arr.forEach(item => {
//       console.log(item)
//       const template = document.querySelector('#cart-list').insertAdjacentHTML('afterbegin', `
//       <li
//         class="flex gap-4 p-5 items-start text-black bg-white border-t-4 border-solid rounded-sm shadow-2xl border-orange justify-stretch  justify-between"
//       >
//         <div class="grid gap-4">
//           <h2>${item.name}</h2>
//           <p>Quantity: ${item.quantity} / ${item.formattedValue} each</p>
//         </div>
//         <div class="grid justify-items-end h-full content-between">
//           <button onclick="store.dispatch(removeItem('${item.id}'
//           ))">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               class="w-6 h-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//               />
//             </svg>
//           </button>
//           <div class="flex items-center">
//             <button
//               class="flex items-center justify-center w-8 h-8 text-3xl transition-colors bg-white border-2 border-solid cursor-pointer text-red border-red hover:bg-red hover:text-white"
//               aria-label="remove one ${item.name} from cart"
//               onclick=""
//             >
//               -
//             </button>
//             <label for="number"
//               ><input
//                 class="w-8 h-8 mx-5 text-2xl text-center text-white rounded-full bg-red font-heading"
//                 type="number"
//                 min="1"
//                 value="${item.quantity}"
//             /></label>
//             <button
//               class="flex items-center justify-center w-8 h-8 text-3xl transition-colors bg-white border-2 border-solid cursor-pointer text-red border-red hover:bg-red hover:text-white"
//               aria-label="add one ${item.name} from cart"
//               onclick=""
//             >
//               +
//             </button>
//           </div>
//         </div>
//       </li>`)

//     return template })
//   }
// })

// function createTemplate(item) {
//   const template = document.querySelector('#template')
//   const product = template.content.cloneNode(true)

//   const img = product.querySelector('img')
//   img.src = item.product.images[0]
//   img.alt = item.product.name
//   product.querySelector('h2').innerText = item.product.name
//   product.querySelector('[name=sku]').value = item.id
//   product.querySelector('.price').innerText = `$${Math.round(
//     item.unit_amount_decimal / 100
//   ).toFixed(2)}`
//   const form = product.querySelector('form')
//   form.addEventListener('submit', handleFormSubmit)

//   return product
// }

// export async function loadProducts() {
//   const main = document.querySelector('main')
//   const prices = await fetch('/.netlify/functions/get-products')
//     .then((res) => res.json())
//     .catch((err) => console.error(err))
//   prices.data.forEach((price) => {
//     main.appendChild(createTemplate(price))
//   })
// }

// const data = [
//   {
//     "id": 1,
//     "categories": ["ramen"],
//     "name": "Veggie Ramen",
//     "desc": "Bean sprouts bamboo slices Tokyo kamaboko Kumamoto toasted sesame seeds Nagoya leek bean sprouts scallions leek minced garlic curry bean sprouts ginger.",
//     "price": "12.00",
//     "image": "veggie"
//   },
//   {
//     "id": 2,
//     "categories": ["ramen"],
//     "name": "Shrimp Ramen",
//     "desc": "Bean sprouts bamboo slices Tokyo kamaboko Kumamoto toasted sesame seeds Nagoya leek bean sprouts scallions leek minced garlic curry bean sprouts ginger.",
//     "price": "15.00",
//     "image": "shrimp"
//   },
//   {
//     "id": 3,
//     "categories": ["ramen"],
//     "name": "Protein Ramen",
//     "desc": "Bean sprouts bamboo slices Tokyo kamaboko Kumamoto toasted sesame seeds Nagoya leek bean sprouts scallions leek minced garlic curry bean sprouts ginger.",
//     "price": "15.00",
//     "image": "protein"
//   },
//   {
//     "id": 4,
//     "categories": ["ramen"],
//     "name": "Pork Bacon Ramen",
//     "desc": "Bean sprouts bamboo slices Tokyo kamaboko Kumamoto toasted sesame seeds Nagoya leek bean sprouts scallions leek minced garlic curry bean sprouts ginger.",
//     "price": "12.00",
//     "image": "pork"
//   },
//   {
//     "id": 5,
//     "categories": ["ramen"],
//     "name": "Chicken Ramen",
//     "desc": "Bean sprouts bamboo slices Tokyo kamaboko Kumamoto toasted sesame seeds Nagoya leek bean sprouts scallions leek minced garlic curry bean sprouts ginger.",
//     "price": "12.00",
//     "image": "chicken"
//   },
//   {
//     "id": 6,
//     "categories": ["ramen"],
//     "name": "Spicy Beef Ramen",
//     "desc": "Bean sprouts bamboo slices Tokyo kamaboko Kumamoto toasted sesame seeds Nagoya leek bean sprouts scallions leek minced garlic curry bean sprouts ginger.",
//     "price": "12.00",
//     "image": "beef"
//   }
// ]
