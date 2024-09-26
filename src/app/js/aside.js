import { contador } from "./contador-carrito.js";

export function createAside() {
    let asideContainer = document.querySelector("#aside");
    let productStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];

    // Limpiar el contenido previo del asideContainer
    asideContainer.innerHTML = "";

    if (productStorage.length > 0) {
        let btnFin = document.querySelector("#btn-finalizar");
        let btnElim = document.querySelector("#btn-eliminar");
        btnFin.setAttribute("style", "display:block !important");
        btnElim.setAttribute("style", "display:block !important");

        function updateTotalCompra() {
            let objLocalStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];
            let totalCompra = objLocalStorage.reduce((total, p) => total + (p.price * p.quantity), 0);
            let totalCompraElement = document.getElementById("total-compra");
            if (totalCompraElement) {
                totalCompraElement.innerHTML = `<h4 class="text-center">Total: $${totalCompra.toFixed(2)}</h4>`;
            }

            if (objLocalStorage.length === 0) {
                asideContainer.innerHTML = `
                <div style="text-align:center">
                    <span style="color:grey">Your cart is empty</span>
                    <img src="src/assets/carrito-vacio.jpg" style="width:100%;object-fit:content">
                </div>`;
                btnFin.setAttribute("style", "display:none !important");
                btnElim.setAttribute("style", "display:none !important");
            }

            contador();
        }

        productStorage.forEach((p) => {
            let aside = `
                <div class="card mb-3" style="max-width: 540px;" id="card-${p.id}">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src=${p.image} class="img-fluid rounded-start" alt="${p.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${p.title}</h5>
                                <p class="card-text fs-5" id="price-${p.id}">Price: $${p.price}</p>
                                <button type="button" class="btn btn-danger" id="decrease-${p.id}">-</button>
                                <span class="mx-2 fs-5" id="quantity-${p.id}">${p.quantity}</span>
                                <button type="button" class="btn btn-success" id="increase-${p.id}">+</button>
                                <a id="remove-${p.id}" style="font-size:24px; color:red; padding-left:5px; cursor: pointer;"><i class="bi bi-trash3"></i></a>
                            </div>
                        </div>
                    </div>
                </div>`;

            asideContainer.innerHTML += aside;

            // Configurar botones de aumentar y disminuir cantidad
            setTimeout(() => {
                let btnMas = document.querySelector(`#increase-${p.id}`);
                let btnMenos = document.querySelector(`#decrease-${p.id}`);
                let spanQuantity = document.querySelector(`#quantity-${p.id}`);
                let parrafPrice = document.querySelector(`#price-${p.id}`);

                // Mostrar u ocultar el botón "menos" según la cantidad
                btnMenos.style.display = p.quantity === 1 ? "none" : "inline-block";

                btnMas.onclick = () => {
                    let objLocalStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];
                    let index = objLocalStorage.findIndex((product) => product.id === p.id);
                    p.quantity += 1;
                    spanQuantity.innerHTML = p.quantity;
                    parrafPrice.innerHTML = `Price: $${(p.price * p.quantity).toFixed(2)}`;
                    objLocalStorage[index].quantity = p.quantity;
                    localStorage.setItem("productosCarrito", JSON.stringify(objLocalStorage));

                    // Actualizar el total de la compra
                    updateTotalCompra();

                    // Mostrar el botón "menos"
                    btnMenos.style.display = "inline-block";
                };

                btnMenos.onclick = () => {
                    let objLocalStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];
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
                    } else {
                        spanQuantity.innerHTML = p.quantity;
                        parrafPrice.innerHTML = `Price: $${(p.price * p.quantity).toFixed(2)}`;
                        objLocalStorage[index].quantity = p.quantity;
                    }

                    localStorage.setItem("productosCarrito", JSON.stringify(objLocalStorage));
                    updateTotalCompra();

                    // Ocultar el botón "menos" si la cantidad es 1
                    btnMenos.style.display = p.quantity === 1 ? "none" : "inline-block";
                };

                let btnEliminar = document.querySelector(`#remove-${p.id}`);
                btnEliminar.onclick = () => {
                    let objLocalStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];
                    let index = objLocalStorage.findIndex((product) => product.id === p.id);
                    objLocalStorage.splice(index, 1);
                    document.querySelector(`#card-${p.id}`).remove();

                    Swal.fire({
                        title: "Product removed from cart",
                        confirmButtonColor: "#008000",
                        timer: 1500
                    });
                    localStorage.setItem("productosCarrito", JSON.stringify(objLocalStorage));
                    updateTotalCompra();
                };
            }, 0);
        });

        let totalCompra = productStorage.reduce((total, p) => total + (p.price * p.quantity), 0);
        let totalCompraElement = document.createElement("div");
        totalCompraElement.id = "total-compra";
        totalCompraElement.innerHTML = `<h4 class="text-center">Total: $${totalCompra.toFixed(2)}</h4>`;
        asideContainer.appendChild(totalCompraElement);

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
        let btnFin = document.querySelector("#btn-finalizar");
        let btnElim = document.querySelector("#btn-eliminar");
        btnFin.setAttribute("style", "display:none !important");
        btnElim.setAttribute("style", "display:none !important");

        asideContainer.innerHTML = `
            <div style="text-align:center">
                <span style="color:grey">Your cart is empty</span>
                <img src="src/assets/carrito-vacio.jpg" style="width:100%;object-fit:content">
            </div>`;
    }
}
