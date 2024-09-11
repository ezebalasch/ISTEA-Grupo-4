 import { getProducts } from "../api/api.js";

// export function cards() {
//     getProducts().then((data) => {
//         data.map((prod) => {
//             let card = ``;
//             setTimeout(() => {
// 				let btnProd = document.querySelector(`#btn-prod-${prod.id}`);
// 				btnProd.onclick = () => createModal(prod);
//             })
//         })
//     })
// }

let cardContainer = document.querySelector("#card__template");

export function createCards() {
    getProducts().then((data) => {
        data.map((prod) => {
            let card = `<div class="card" style="width: 16rem;">
            <div class="d-flex justify-content-center">
            <img src="${prod.image}" class="card-img-top" alt="${prod.title}" title="${prod.title}">
            </div>
            <div class="card-body d-flex flex-column detail-cont">
              <h5 class="card-title">${prod.title.split(' ').slice(0, 3).join(' ')}</h5>
              <p class="card-text">${prod.description.split(' ').slice(0, 10).join(' ')}...</p>
              <h6 class="card-subtitle mb-2">$${Math.round(prod.price)}</h6>
              <div class="container-btn-card">
                <a href="#" title="Details" class="ver-mas">Ver más</a>
                <a href="#" title="Buy" class="comprar">Comprar!</a>
              </div>
            </div>
          </div>`;

                cardContainer.innerHTML += card;
    });

});
}
