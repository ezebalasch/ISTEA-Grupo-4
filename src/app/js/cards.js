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
            let card = `<div class="col">
                <div class="card">
                    <img src=${prod.image} class="card-img-top" alt=${prod.title}>
                    <div class="card-body">
                    <h5 class="card-title"> ${prod.title}</h5>
                    <p class="card-text">${prod.description}</p>
                    </div>
                </div>
                </div>`;

                cardContainer.innerHTML += card;
    });

});
}
