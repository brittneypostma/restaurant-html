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
