/*---------------CARGAR LA BASE DE DATOS--------------- */

document.addEventListener('DOMContentLoaded', ()=>{ /* Mientras se cargue el DOM, a a ocurrir lo que haya adentro */
    showProducts(products); /* En este caso mostrar los productos */

});

/*---------------VARIABLES Y SELECTORES---------------*/

// STEP 1 (Buscador) - Señalar el inputSearch
const inputSearch = document.getElementById('input-search');
// STEP 2 (Buscador) - Crear una variable para guardar lo que la persona escribió
const criterioSeleccionado = { // Se crea para guardar el valor que se esté buscando en ese momento 
    name : '' // Aqui se guarda el critero seleccionado

};
const iconSelectorFruits = document.querySelector('.icon-selector-fruits');


/*---------------INYECTAR LAS CARDS--------------- */
function showProducts(products) {
    
    /* Selector para tarjetas */
    const cardContainer = document.querySelector('#cardContainer');
    
    products.forEach((product)=>{
        const productCard = document.createElement('div');
         
        
        productCard.innerHTML = `
        <div class="separador">
        <div class="image">
        <figure>
        <img src="../Img/${product.image}" alt="">
        </figure>
        </div>
        
        <div class="titleProduct">
        <h3 class="productName">${product.name}</h3>
        </div>
        
        <div class="description">
        <p class="productDescription">${product.description}</p>
        </div>
        
        <div class="price">
        <p class="productPrice"> $ ${product.pricePound} COP</p>
        </div>
        
        <div class="cart">
        
        <button class="addCart">
        <p class="textAddCart">Agregar al carrito</p>
        </button>
        
        </div>
        </div>
        `;
        cardContainer.appendChild(productCard);
    });
    
};

/*---------------BUSCADOR---------------*/

// STEP 3 (Buscador) - Crearle el addEventListener
inputSearch.addEventListener('input', event =>{
    //console.log(event.target.value);
    
    // STEP 4 (Buscador) - Igualar lo que la persona escribió, a nuestra variable donde ibamos a guardar el valor
    criterioSeleccionado.name = event.target.value
    // console.log(criterioSeleccionado.name);
    
    //  STEP 5 (Buscador) - Llamar a la funcion de filtrar
    filterName(); 
});

// STEP 6 (Buscador) 
function filterName() {
    const product = products.filter(filterByName); // Filtra segun lo que le pasemos en los parametros

    console.log(product); // Se convierte en un array nuevo con los parametros filtrados
    console.log(product[0]);
    console.log(product[0].name);
    
    // STEP 10 (Buscador)  - Llamar a la funcion de limpiar 
    cleanCards(); // La función se llama antes porque debemos primero limpiar y despues mostrar

    // STTEP 8 (Buscador) - Llamar a la funcion que imprime las cards
    showProducts(product); // 'product' porque estamos mostrando el producto ya filtrado

};

// STEP 7 (Buscador)
function filterByName(products) { // El parametro es el nombre de la lista en la que vamos a buscar
    if (criterioSeleccionado.name) { // Si 'criterioSeleccionado.name' existe, entonces... 
        return products.name == criterioSeleccionado.name.toLowerCase();
    } else {
        return products
    };
};

// STEP 9 (Buscador) - Funcion para eliminar las otras cards
function cleanCards() {
    const cardContainer = document.querySelector('#cardContainer');

    cardContainer.innerHTML = `
    
    `;
};

/*---------------FILTRAR FRUTA---------------*/
iconSelectorFruits.addEventListener('click', event => {
    //console.log(products[0].category);

    const product = products.filter(filterFruit);

    products.forEach( object => {
        //console.log(object.category);
        showProducts(object)

        // if (object.category == 'frutas') {
        //     console.log('fruits');


        // } else {
        // }
    })
});

function filterFruit(products) {
    if (products.category ) {
        return products.category
    }
}