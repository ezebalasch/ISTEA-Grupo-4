export function contador() {
    let numeroCarrito = document.querySelector("#cart-count");
    numeroCarrito.innerHTML = "";
    let productStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];
    productStorage.length > 0 ? (numeroCarrito.innerHTML += productStorage.length) : '';
}
