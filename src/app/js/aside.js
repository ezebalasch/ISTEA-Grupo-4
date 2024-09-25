import { contador } from "./contador-carrito.js";

export function createAside() {
    let asideContainer = document.querySelector("#aside");
    let productStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];


    // Limpiar el contenido previo del asideContainer
    asideContainer.innerHTML = "";


    if (productStorage.length > 0) {
        // Mostrar los botones si hay productos en el carrito
        let btnFin = document.querySelector("#btn-finalizar");
        let btnElim = document.querySelector("#btn-eliminar");
        btnFin.setAttribute("style", "display:block !important");
        btnElim.setAttribute("style", "display:block !important");


        productStorage.map((p) => {
            let aside = `
                <div class="card mb-3" style="max-width: 540px;" id="card-${p.id}">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src=${p.image} class="img-fluid rounded-start" alt="${p.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${p.title}</h5>
                                <p class="card-text fs-5" id="price-${p.id}">Price: $${p.price * p.quantity}</p>
                                <button type="button" class="btn btn-danger" id="decrease-${p.id}">-</button>
                                <span class="mx-2 fs-5" id="quantity-${p.id}">${p.quantity}</span>
                                <button type="button" class="btn btn-success" id="increase-${p.id}">+</button>
                            </div>
                        </div>
                    </div>
                </div>`;


            asideContainer.innerHTML += aside;


            // Configurar botones de aumentar y disminuir cantidad
            setTimeout(() => {
                let btnMas = document.querySelector(`#increase-${p.id}`);
                let spanQuantity = document.querySelector(`#quantity-${p.id}`);
                let parrafPrice = document.querySelector(`#price-${p.id}`);
               
                btnMas.onclick = () => {
                    let objLocalStorage = JSON.parse(localStorage.getItem("productosCarrito"));
                    let index = objLocalStorage.findIndex((product) => product.id === p.id);
                    p.quantity += 1;
                    spanQuantity.innerHTML = p.quantity;
                    parrafPrice.innerHTML = `Price: $${p.price * p.quantity}`;
                    objLocalStorage[index] = p;
                    localStorage.setItem("productosCarrito", JSON.stringify(objLocalStorage));


                    // Actualizar el total de la compra
                    updateTotalCompra();
                };


                let btnMenos = document.querySelector(`#decrease-${p.id}`);
                btnMenos.onclick = () => {
                    let objLocalStorage = JSON.parse(localStorage.getItem("productosCarrito"));
                    let index = objLocalStorage.findIndex((product) => product.id === p.id);
                    p.quantity -= 1;


                    if (p.quantity === 0) {
                        objLocalStorage.splice(index, 1);
                        document.querySelector(`#card-${p.id}`).remove();
                        Swal.fire({
                            title: "The product has been removed from the cart",
                            confirmButtonColor: "#008000",
                            timer: 1500
                        });


                        // Si el carrito queda vacío, ocultar los botones
                        if (objLocalStorage.length === 0) {
                            let btnFin = document.querySelector("#btn-finalizar");
                            let btnElim = document.querySelector("#btn-eliminar");
                            btnFin.setAttribute("style", "display:none !important");
                            btnElim.setAttribute("style", "display:none !important");
                            let aside = `
                            <div style="text-align:center">
                                <span style="color:grey">Your cart is empty</span>
                                <img src="src/assets/carrito-vacio.jpg" style="width:100%;object-fit:content">
                            </div>`;
                        asideContainer.innerHTML = aside;
               
                        }
                    } else {
                        spanQuantity.innerHTML = p.quantity;
                        parrafPrice.innerHTML = `Price: $${p.price * p.quantity}`;
                        objLocalStorage[index] = p;
                    }


                    localStorage.setItem("productosCarrito", JSON.stringify(objLocalStorage));


                    // Actualizar el total de la compra
                    updateTotalCompra();
                };
            }, 0);
        });


         // Crear el total de la compra
         let totalCompra = productStorage.reduce((total, p) => total + (p.price * p.quantity), 0);


         // Mostrar el total de la compra al final (una sola vez)
         let totalCompraElement = document.createElement("div");
         totalCompraElement.id = "total-compra";
         totalCompraElement.innerHTML = `<h4 class="text-center">Total: $${totalCompra.toFixed(2)}</h4>`;
         asideContainer.appendChild(totalCompraElement);


        // Configurar botones de finalizar y eliminar carrito
        let btnFinalizar = document.querySelector("#btn-finalizar");
        let btnEliminar = document.querySelector("#btn-eliminar");


        btnFinalizar.onclick = () => {
            asideContainer.innerHTML = "";
            localStorage.removeItem("productosCarrito");
            btnFinalizar.setAttribute("style", "display:none !important");
            btnEliminar.setAttribute("style", "display:none !important");
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your purchase has been finalized!",
                showConfirmButton: false,
                timer: 2000
            });
            createAside();
            contador();

        };


        btnEliminar.onclick = () => {
            asideContainer.innerHTML = "";
            localStorage.setItem("productosCarrito", JSON.stringify([]));
            btnFinalizar.setAttribute("style", "display:none !important");
            btnEliminar.setAttribute("style", "display:none !important");
            Swal.fire({
                position: "center",
                icon: "success",
                title: "The product has been removed from the cart",
                showConfirmButton: false,
                timer: 2000
            });
            createAside();
            contador();

        };


    } else {
        // Si el carrito está vacío, ocultar los botones
        let btnFin = document.querySelector("#btn-finalizar");
        let btnElim = document.querySelector("#btn-eliminar");
        btnFin.setAttribute("style", "display:none !important");
        btnElim.setAttribute("style", "display:none !important");


        let aside = `
            <div style="text-align:center">
                <span style="color:grey">Your cart is empty</span>
                <img src="src/assets/carrito-vacio.jpg" style="width:100%;object-fit:content">
            </div>`;
        asideContainer.innerHTML = aside;
    }
}


// Función para actualizar el total de la compra
function updateTotalCompra() {

    let totalCompra = productStorage.reduce((total, p) => total + (p.price * p.quantity), 0);
    let totalCompraElement = document.getElementById("total-compra");
    if (totalCompraElement) {
        totalCompraElement.innerHTML = `<h4 class="text-center">Total: $${totalCompra.toFixed(2)}</h4>`;
    }
    contador();


}
