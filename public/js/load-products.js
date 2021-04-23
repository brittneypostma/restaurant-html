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

export async function loadProducts() {
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


const products = [
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
