import { getProducts } from "../api/api.js";
import { createCards } from "./cards.js";
import { createAside } from "./aside.js";
createCards();

/*Inicializar el localstorage como array vacio*/

if(localStorage.getItem("productosCarrito") == null){
    localStorage.setItem("productosCarrito", JSON.stringify([]))
}

createAside();

