const data = [
  {
    "id": 1,
    "categories": ["ramen"],
    "name": "Veggie Ramen",
    "desc": "Bean sprouts bamboo slices Tokyo kamaboko Kumamoto toasted sesame seeds Nagoya leek bean sprouts scallions leek minced garlic curry bean sprouts ginger.",
    "price": "12.00",
    "image": "veggie"
  },
  {
    "id": 2,
    "categories": ["ramen"],
    "name": "Shrimp Ramen",
    "desc": "Bean sprouts bamboo slices Tokyo kamaboko Kumamoto toasted sesame seeds Nagoya leek bean sprouts scallions leek minced garlic curry bean sprouts ginger.",
    "price": "15.00",
    "image": "shrimp"
  },
  {
    "id": 3,
    "categories": ["ramen"],
    "name": "Protein Ramen",
    "desc": "Bean sprouts bamboo slices Tokyo kamaboko Kumamoto toasted sesame seeds Nagoya leek bean sprouts scallions leek minced garlic curry bean sprouts ginger.",
    "price": "15.00",
    "image": "protein"
  },
  {
    "id": 4,
    "categories": ["ramen"],
    "name": "Pork Bacon Ramen",
    "desc": "Bean sprouts bamboo slices Tokyo kamaboko Kumamoto toasted sesame seeds Nagoya leek bean sprouts scallions leek minced garlic curry bean sprouts ginger.",
    "price": "12.00",
    "image": "pork"
  },
  {
    "id": 5,
    "categories": ["ramen"],
    "name": "Chicken Ramen",
    "desc": "Bean sprouts bamboo slices Tokyo kamaboko Kumamoto toasted sesame seeds Nagoya leek bean sprouts scallions leek minced garlic curry bean sprouts ginger.",
    "price": "12.00",
    "image": "chicken"
  },
  {
    "id": 6,
    "categories": ["ramen"],
    "name": "Spicy Beef Ramen",
    "desc": "Bean sprouts bamboo slices Tokyo kamaboko Kumamoto toasted sesame seeds Nagoya leek bean sprouts scallions leek minced garlic curry bean sprouts ginger.",
    "price": "12.00",
    "image": "beef"
  }
]


function createMenuTemplate(item) {
  const template = document.querySelector('#menu-template')
  const menu = template.content.cloneNode(true)
  menu.querySelector('#name').innerText = item.name
  menu.querySelector('#desc').innerText = item.desc
  menu.querySelector('#price').innerText = `$${item.price }`

  return menu
}

function createOrderTemplate(item) {
  const template = document.querySelector('#order-template')
  const order = template.content.cloneNode(true)
  const img = order.querySelector('img')
  img.src = `./assets/images/card-images/${item.image}.png`
  img.alt = item.name
  // const add = order.querySelector('#add-btn').setAttribute(`Add ${quantity} ${item.name}.`)
  order.querySelector('#name').innerText = item.name
  order.querySelector('#price').innerText = `$${item.price }`


  return order
}

export async function loadProducts() {
  const menu = document.querySelector('#menu')
  const order = document.querySelector('#order')
  data.forEach((item) => {
    menu.appendChild(createMenuTemplate(item))
    order.appendChild(createOrderTemplate(item))
  })
}


// async function handleFormSubmit(event) {
//   event.preventDefault()
//   const form = new FormData(event.target)

//   const data = {
//     sku: form.get('sku'),
//     quantity: 1,
//   }

//   const response = await fetch('/.netlify/functions/create-checkout', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.error(err))
//   console.log(response)
//   const stripe = await Stripe(response.publishableKey)

//   const { error } = await stripe.redirectToCheckout({
//     sessionId: response.sessionId,
//   })

//   if (error) {
//     console.error(error)
//   }
// }

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