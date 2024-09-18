
export function createAside(){
    let asideContainer = document.querySelector("#aside");
    let productStorage = JSON.parse(localStorage.getItem("productosCarrito"));
    if (productStorage && productStorage.length){
        //let btnsCarrito = document.querySelector("#btnsCarrito");
        //btnsCarrito.setAttribute("style","display:flex !important;");
        let btnFin = document.querySelector("#btn-finalizar")
        let btnElim = document.querySelector("#btn-eliminar")
        btnFin.setAttribute("style", "display:block !important");
        btnElim.setAttribute("style", "display:block !important");
    } 
   productStorage && productStorage.map((p)=> { 
        let aside = 
            `<div class="card mb-3" style="max-width: 540px;" id="card-${p.id}">
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
                        </div>
                    </div>
                </div>
            </div>`;

            setTimeout(()=>{
                
                let btnMas = document.querySelector(`#increase-${p.id}`);
                let spanQuantity = document.querySelector(`#quantity-${p.id}`);
                let parrafPrice = document.querySelector(`#price-${p.id}`);
                btnMas.onclick = () => {
                    let objLocalStorage = JSON.parse(localStorage.getItem("productosCarrito"));
                    let index = objLocalStorage.findIndex((product)=> product.id === p.id);
                    p.quantity += 1;
                    spanQuantity.innerHTML = p.quantity;
                    parrafPrice.innerHTML = `Price: $${p.price*p.quantity}`
                    objLocalStorage[index] = p;
                    //JSON.stringify hace el parseo de objeto a string
                    //localstorage solo admite string
                    localStorage.setItem("productosCarrito", JSON.stringify(objLocalStorage));
                }

                let btnMenos = document.querySelector(`#decrease-${p.id}`);
                btnMenos.onclick = ()=>{
                    
                    let objLocalStorage = JSON.parse(localStorage.getItem("productosCarrito"));
                    let index = objLocalStorage.findIndex((product)=> product.id === p.id); 
                    p.quantity -= 1;
                    if (p.quantity === 0){
                        objLocalStorage.splice(index,1)
                        let cardRemove = document.querySelector(`#card-${p.id}`)
                        cardRemove.remove();
                        Swal.fire({title: "El producto ha sido eliminado del carrito",
                            confirmButtonColor: "#008000",
                            timer: 1500
                        });
                        
                    } else{
                        spanQuantity.innerHTML = p.quantity;
                        parrafPrice.innerHTML = `Price: $${p.price*p.quantity}`
                        objLocalStorage[index] = p;    
                    }


                    localStorage.setItem("productosCarrito", JSON.stringify(objLocalStorage))
                    
                    
                    //JSON.stringify hace el parseo de objeto a string
                    //localstorage solo admite string
                    
                }
                
              
            }, 0 );

            asideContainer.innerHTML += aside;
        });
        let btnFinalizar = document.querySelector("#btn-finalizar")
        let btnEliminar = document.querySelector("#btn-eliminar")
        btnFinalizar.onclick = () =>{
            asideContainer.innerHTML = "";
            localStorage.removeItem("productosCarrito");
            btnFinalizar.setAttribute("style", "display:none !important");
            btnEliminar.setAttribute("style", "display:none !important");
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Su compra ha sido finalizada!",
                showConfirmButton: false,
                timer: 2000
              });
              createAside();
        }
        
        btnEliminar.onclick = () =>{
            asideContainer.innerHTML = "";
            localStorage.removeItem("productosCarrito");
            btnFinalizar.setAttribute("style", "display:none !important");
            btnEliminar.setAttribute("style", "display:none !important");
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Los productos han sido eliminados del carrito",
                showConfirmButton: false,
                timer: 2000
              });
              createAside();
        }
}


    
