export function getProducts() {
	return fetch("https://fakestoreapi.com/products")
		.then((res) => res.json())
		.then((data) => data);
}

export function getCategories() {
	fetch("https://fakestoreapi.com/products/categories")
		.then((res) => res.json())
		.then((json) => console.log(json));
}