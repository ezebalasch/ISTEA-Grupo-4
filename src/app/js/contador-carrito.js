export function contador() {
    /*let numeroCarrito = document.querySelector("#cart-count");
    numeroCarrito.innerHTML = "";
    let productStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];
    productStorage.length > 0 ? (numeroCarrito.innerHTML += productStorage.length) : '';*/

    let cartCount = document.querySelector("#cart-count"); 
    if (cartCount) {
        let productStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];
        let cantidad = productStorage.reduce((cant, p) => cant + p.quantity, 0);
        cartCount.textContent = cantidad;
    }
}
