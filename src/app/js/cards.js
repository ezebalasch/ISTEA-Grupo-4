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
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${prod.title}</h5>
              <p class="card-text">Descripción breve del producto que estás promocionando. Este producto tiene las mejores características para ti.</p>
              <h6 class="card-subtitle mb-2">Price: $${prod.price}</h6>
              <div class="mt-auto">
              <a href="#" title="Details" class="btn btn-secondary">See more</a>
                <a href="#" title="Buy" class="btn btn-success">Buy Now!</a>
                </div>
            </div>
          </div>`;

                cardContainer.innerHTML += card;
    });

});
}
