export default function toggleCart() {
  const cart = document.querySelector('#cart')

  cart.addEventListener('click', () => {
    document.querySelector('#cart-items').classList.toggle('hidden')
  })
}

const testApiKey = "pk_test_51H3WzVA5gnA92gtxXNCulxWBYSBrAt4xvuuYkv6Tp5uvlQl1ZPZj3uHIX0PNCSDjdP7eOv7o46nlKZzhuvoowggt00VRkn0FMf";
let store = UseShoppingCartCore.createShoppingCartStore({
  stripe: testApiKey,
  mode: "client-only",
  successUrl: "https://success.html",
  cancelUrl: "https://index.html",
});

let persistor = UseShoppingCartCore.createPersistedStore(store);


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
} = UseShoppingCartCore.actions;

let numberOfItems = Object.keys(JSON.stringify(store.getState().cartDetails)).length === 0 ? JSON.stringify(store.getState().cartDetails) : 0

function render() {
  if (!store.getState().bootstrapped) {
    document.getElementById("cart-details").innerHTML = "?";
  }

  document.getElementById("cart-details").innerHTML = numberOfItems;


}
render();

store.subscribe(render);