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
                <button title="Details" id="btn-detail-${prod.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="ver-mas">Ver más</button>
                <button title="Buy" id="btn-buy-${prod.id}" class="comprar">Comprar!</button>
              </div>
            </div>
          </div>`;

          setTimeout(() => {
            let btnDetail = document.querySelector(`#btn-detail-${prod.id}`);
            //console.log(btnDetail);
            btnDetail.onclick = ()=>{
              let modal = document.querySelector("#staticBackdrop");
              let modalTitle = document.querySelector("#staticBackdropLabel");
              modalTitle.innerHTML=prod.title;
              let modalImage = document.querySelector("#modal-img");
              modalImage.src = prod.image;
              modalImage.alt = prod.image;
              let modalCategory = document.querySelector("#modal-category");
              let modalDescription = document.querySelector("#modal-description");
              modalCategory.innerHTML = prod.category;
              modalDescription.innerHTML = prod.description.split(' ').slice(0, 10).join(' ');
              let cardPrice = document.querySelector("#card-price");
              cardPrice.innerHTML = "$ "+prod.price;
              let rateAndCount = document.querySelector("#rateAndCount");
              rateAndCount.innerHTML = `Rate: ${prod.rating.rate} Count: ${prod.rating.count}`;
            }
          },0);

          
          
          

                cardContainer.innerHTML += card;
    });

});
}
