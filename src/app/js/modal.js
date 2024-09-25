import { createAside } from "./aside.js";

function cutTitle(str){
    return str.split(' ').slice(0, 3).join(' ');
    }
    function cutDescription(str){
      return str.split(' ').slice(0, 10).join(' ');
    }

export function createModal(prod){
  
  
    let modal = `<div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">${prod.title}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src=${prod.image} id="modal-img" class="img-fluid rounded-start" alt=${prod.title}>
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h6 class="card-title" id="modal-category">Category: ${prod.category}</h6>
                          <p class="card-text" id="modal-description">${cutDescription(prod.description)}</p>
                          <h4 class="card-price" id="card-price">${"$ "+Math.round(prod.price)}</h4>
                          <div>
                            <h6 class="text-muted" id="rateAndCount">Rate: ${prod.rating.rate} Count: ${prod.rating.count}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  <button title="Add to cart" type="button" class="btn btn-success" id=btn-cart-${prod.id}>Add to cart!</button>
                </div>
              </div>
            </div>`

            let modalContainer = document.querySelector("#staticBackdrop");
            modalContainer.innerHTML = modal;

            setTimeout(()=>{
              let carritoId = document.querySelector(`#btn-cart-${prod.id}`);
              carritoId.onclick = () => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Added to cart successfully!",
                  showConfirmButton: false,
                  timer: 2000
                });
                
                //Leer datos del localStorage con getitem
                
                let objLocalStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];
                let productoExiste = objLocalStorage.find((e) => e.id === prod.id);
                let index = objLocalStorage.findIndex((p) => p.id === prod.id);
                
                if(productoExiste){
                  productoExiste.quantity += 1;
                  objLocalStorage[index] = productoExiste;
                } else {
                  prod.quantity = 1;
                  objLocalStorage.push(prod);
                }
                   //JSON.stringify hace el parseo de objeto a string
                //localstorage solo admite string
                localStorage.setItem("productosCarrito", JSON.stringify(objLocalStorage));
                createAside();
              }

            }, 0 );

            const myModal = new bootstrap.Modal(modalContainer);
            myModal.show();
}