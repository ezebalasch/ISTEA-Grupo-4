import { getProducts } from "../api/api.js";
import { createCards } from "./cards.js";
import { createAside } from "./aside.js";
import { searchingProducts } from "./search.js";
import { handleNavbarScroll } from "./navbar.js";
import { contador } from "./contador-carrito.js";

createCards();
searchingProducts();
/*Inicializar el localstorage como array vacio*/

if(localStorage.getItem("productosCarrito") === null){
    localStorage.setItem("productosCarrito", JSON.stringify([]))
    
}

createAside();
contador();

handleNavbarScroll("#navbar");


