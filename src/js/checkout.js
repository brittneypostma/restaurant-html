// //test api key
// const testApiKey = "pk_test_51H3WzVA5gnA92gtxXNCulxWBYSBrAt4xvuuYkv6Tp5uvlQl1ZPZj3uHIX0PNCSDjdP7eOv7o46nlKZzhuvoowggt00VRkn0FMf";
// let store = UseShoppingCartCore.createShoppingCartStore({
//   stripe: testApiKey,
//   mode: "client-only",
//   successUrl: "https://success.html",
//   cancelUrl: "https://index.html",
// });

// let persistor = UseShoppingCartCore.createPersistedStore(store);


// const {
//   addItem,
//   checkoutSingleItem,
//   clearCart,
//   decrementItem,
//   handleCartClick,
//   handleCloseCart,
//   incrementItem,
//   redirectToCheckout,
//   removeItem,
//   formatCurrencyString,
// } = UseShoppingCartCore.actions;

// let numberOfItems = Object.keys(JSON.stringify(store.getState().cartDetails)).length === 0 ? JSON.stringify(store.getState().cartDetails) : 0

// function render() {
//   if (!store.getState().bootstrapped) {
//     document.getElementById("cart-details").innerHTML = "?";
//   }

//   document.getElementById("cart-details").innerHTML = numberOfItems;


// }
// render();

// store.subscribe(render);



// function addItemToCart(item) {

// }

// document
//   .getElementById("addBananasToCart")
//   .addEventListener("click", function () {
//     store.dispatch(addItem(product));
//   });

// document
//   .getElementById("addTangerinesToCart")
//   .addEventListener("click", function () {
//     store.dispatch(addItem(product2));
//   });

// document
//   .getElementById("clearCart")
//   .addEventListener("click", function () {
//     store.dispatch(clearCart());
//   });

// document
//   .getElementById("checkout")
//   .addEventListener("click", function () {
//     store.dispatch(redirectToCheckout());
//   });


// import stripe
// pull products from stripe
// load products from stripe
// update cart with usc
// redirect to stripe

// const products = [
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

// const product = {
//   name: "Bananas",
//   description: "Yummy yellow fruit",
//   id: "sku_J4vwzv3Z8kx5JD",
//   price: 400,
//   currency: "USD",
//   image: "https://my-image.com/banana.jpg",
// };

// const product2 = {
//   name: "Tangerines",
//   id: "sku_J4vwzA4WWceluX",
//   price: 100,
//   image: "https://i.imgur.com/4rVhatT.jpg",
//   currency: "USD",
// };
