

// test api key
const testApiKey = "pk_test_MAQ6vJsaQH6lTjJQc07plIB000QCr569IB";
// let store = UseShoppingCartCore.createShoppingCartStore({
//   stripe: testApiKey,
//   mode: "client-only",
//   successUrl: "https://twitter.com/dayhaysoos",
//   cancelUrl: "https://stripe.com",
// });

// let persistor = UseShoppingCartCore.createPersistedStore(store);

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

// function render() {
//   if (!store.getState().bootstrapped) {
//     document.getElementById("cartDetails").innerHTML = "loading . . .";
//   }

//   document.getElementById("cartDetails").innerHTML = JSON.stringify(
//     store.getState().cartDetails,
//     null,
//     2
//   );
// }
// render();

// store.subscribe(render);

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