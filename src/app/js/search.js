import { getProducts } from "../api/api.js";

let btnForm = document.querySelector("#btnForm");
let input = document.querySelector("#inputForm");
let cardContainer = document.querySelector("#card__template");

function cutTitle(str){
    return str.split(' ').slice(0, 3).join(' ');
    }
    function cutDescription(str){
      return str.split(' ').slice(0, 10).join(' ');
    }

export function searchingProducts(){
    inputForm.addEventListener("input", (e)=>{
        //console.log(e.target.value);
        cardContainer.innerHTML = "";
        getProducts().then((data)=>{
          data.map((prod)=>{
            let existe =  prod.title.toLowerCase().includes(e.target.value.toLowerCase());
            //console.log(existe);
            let card;
            if(existe){
                card = `<div class="card" style="width: 16rem;">
                            <div class="d-flex justify-content-center">
                                <img src="${prod.image}" class="card-img-top" alt="${prod.title}" title="${prod.title}">
                            </div>
                            <div class="card-body d-flex flex-column detail-cont">
                                <h5 class="card-title">${cutTitle(prod.title)}</h5>
                                <p class="card-text">${cutDescription(prod.description)}...</p>
                                <h6 class="card-subtitle mb-2">Price: $${Math.round(prod.price)}</h6>
                            <div class="container-btn-card">
                                <button title="Details" id="btn-detail-${prod.id}" class="ver-mas">Ver más</button>
                                <button title="Buy" id="btn-buy-${prod.id}" class="comprar">Comprar!</button>
                            </div>
                            </div>
                        </div>`;
                cardContainer.innerHTML += card;
                    setTimeout(() => {
                        let btnDetail = document.querySelector(`#btn-detail-${prod.id}`);
                        
                        btnDetail.onclick = () => createModal(prod);                      
                      },0);
                }

          
            })  
        })

    })

}