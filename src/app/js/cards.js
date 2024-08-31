import { getProducts } from "../api/api";

export function cards() {
    getProducts().then((data) => {
        data.map((prod) => {
            let card = ``;
            setTimeout(() => {
				let btnProd = document.querySelector(`#btn-prod-${prod.id}`);
				btnProd.onclick = () => createModal(prod);
            })
        })
    })
}
