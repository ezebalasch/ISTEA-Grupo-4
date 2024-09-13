import { getProducts } from "../api/api.js";
//import { getCategories } from "../api/api.js";
import { createCards } from "./cards.js";
import { createModal } from "./modal.js";
createCards();
getProducts();
createModal();
