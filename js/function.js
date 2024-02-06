

/*---------------CARGAR LA BASE DE DATOS--------------- */
let productsInCart = [];

document.addEventListener('DOMContentLoaded', () => {
    // Cargar el archivo JSON
    fetch('../js/products.json')
    .then(response => {return response.json()})
    .then(data => {
        const storedCart = JSON.parse(localStorage.getItem('products_cart')) || [];

        // Inicializar productsInCart con los datos del LocalStorage o un array vacío
        productsInCart = storedCart;

        // Llamar a la función showProducts con los datos cargados
        showProducts(data);
        dataProducts = data;

    })
    .catch(error => console.error('Error cargando el archivo JSON:', error));


});

/*---------------VARIABLES Y SELECTORES---------------*/

// STEP 1 (Buscador) - Señalar el inputSearch
const inputSearch = document.getElementById('input-search');
// STEP 2 (Buscador) - Crear una variable para guardar lo que la persona escribió
const criterioSeleccionado = { // Se crea para guardar el valor que se esté buscando en ese momento 
    name : '' // Aqui se guarda el critero seleccionado
};
const iconSelectorCart = document.querySelector('.icono-selector-cart');
const iconSelectorVegetables = document.querySelector('.vegetables');
const iconSelectorFruits = document.querySelector('.fruits');
const titleVegetables = document.querySelector('.titulo-verduras');
const titleFruits = document.querySelector('.titulo-frutas');
const numbersProductsInCart = document.querySelector('#numeroProductosEnCarrito');
const modal = document.querySelector('.modalContainerMain');
const closeButton = document.querySelector('.close-button');
const modalContainer = document.querySelector('.modalContainer')
const modalContainerMain = document.querySelector('.modalContainerMain');
const totalPrice = document.querySelector('.totalPrice')
let buttonsAddCart = document.querySelectorAll('.buttonsAddCart'); // STEP 1 (Carrito) - Crear una variable para el boton de agregar al carrito


let dataProducts;

/*---------------INYECTAR LAS CARDS--------------- */
function showProducts(products) {
    /* Selector para tarjetas */
    const cardContainer = document.querySelector('#cardContainer');
    
    products.forEach((product)=>{
        //console.log(product.id);
        const productCard = document.createElement('div');
         
        
        productCard.innerHTML = `
        <div class="separador">
            <div class="image">
                <figure>
                    <img src="../Img/frutasyverduras/${product.image}" alt="">
                </figure>
            </div>
            
            <div class="titleProduct">
                <h3 class="productName">${product.name}</h3>
            </div>
            
            <div class="description">
            <p class="productDescription">${product.description} proveniente de ${product.from}</p>
            </div>
            
            <div class="price">
                <p class="productPrice"> $ ${product.pricePound} COP / Lb</p>
            </div>
            
            <div class="cart">
            
                <button class="buttonsAddCart" id="${product.id}">
                    <p class="textbuttonsAddCart">Agregar al carrito</p>
                </button>
            
            </div>
        </div>
        `;
        cardContainer.appendChild(productCard);
    });

    updateButtonAdd(); // STEP 3 (Carrito) - Llamar la función despues del forEach para que actualice el selector de botones siempre que la pagina cargue de nuevo
};


/*---------------BUSCADOR---------------*/

// STEP 3 (Buscador) - Crearle el addEventListener
inputSearch.addEventListener('input', event =>{
    //console.log(event.target.value);
    
    // STEP 4 (Buscador) - Igualar lo que la persona escribió, a nuestra variable donde ibamos a guardar el valor
    criterioSeleccionado.name = event.target.value;

    // console.log(criterioSeleccionado.name);
    
    //  STEP 5 (Buscador) - Llamar a la funcion de filtrar
    filterName(); 
});

// STEP 6 (Buscador) 
function filterName() {
    const product = dataProducts.filter(filterByName); // Filtra segun lo que le pasemos en los parametros

    //console.log(product); // Se convierte en un array nuevo con los parametros filtrados
    //console.log(product[0]);
    //console.log(product[0].name);
    
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

    cardContainer.innerHTML = '';
};


/*---------------FILTRAR FRUTAS Y VERDURAS---------------*/

function filterByCategory(category) {
    const filterProducts = dataProducts.filter(product => product.category === category);
    
    showFoodFiltered(filterProducts);
};

function showFoodFiltered(produtsToShow) {
    
    cleanCards();

    /*const cardContainer = document.querySelector('#cardContainer');
    cardContainer.innerHTML = '';*/
    
    produtsToShow.forEach( product => {
        const card = document.createElement('div');

        card.innerHTML = `
        <div class="separador">
            <div class="image">
                <figure>
                    <img src="../Img/frutasyverduras/${product.image}" alt="">
                </figure>
            </div>
            
            <div class="titleProduct">
                <h3 class="productName">${product.name}</h3>
            </div>
            
            <div class="description">
                <p class="productDescription">${product.description} proveniente de ${product.from}</p>
            </div>
            
            <div class="price">
                <p class="productPrice"> $ ${product.pricePound} COP / Lb</p>
            </div>
            
            <div class="cart">
            
                <button class="buttonsAddCart" id="${product.id}">
                    <p class="textbuttonsAddCart">Agregar al carrito</p>
                </button>
            
            </div>
        </div>
        `;
        cardContainer.appendChild(card);
    });

    updateButtonAdd(); // STEP 3 (Carrito) - Llamar la función despues del forEach para que actualice el selector de botones siempre que la pagina cargue de nuevo
};

iconSelectorFruits.addEventListener('click', function () {
    iconSelectorVegetables.style = "background-color:none";
    iconSelectorFruits.style = "filter: invert(19%) sepia(99%) saturate(4976%) hue-rotate(112deg) brightness(99%) contrast(104%);";
    titleFruits.style = "color: #008000";
    titleVegetables.style = "color: none";
    filterByCategory('frutas');
});

iconSelectorVegetables.addEventListener('click',function () {
    iconSelectorFruits.style = "background-color:none";
    iconSelectorVegetables.style = "filter: invert(19%) sepia(99%) saturate(4976%) hue-rotate(112deg) brightness(99%) contrast(104%);";
    titleVegetables.style = "color: #008000";
    titleFruits.style = "color: none";
    filterByCategory('verduras');
});


/*---------------MODAL CARRITO DE COMPRAS---------------*/

iconSelectorCart.addEventListener('click', function () {
  
    function openModal() {
        modal.style.display = 'block';
    };
  
    function closeModal() {
        modal.style.display = 'none';
    };
  
    openModal();
  
    closeButton.addEventListener('click', function () {
        closeModal();
    });
  
});

/*---------------AGREGAR AL CARRITO---------------*/

function updateButtonAdd() { // STEP 2 (Carrito) - Crear la funcion donde indicamos que nuestra variable será igual a todos los botones de agregar al carrito
    buttonsAddCart = document.querySelectorAll('.buttonsAddCart');
    
    buttonsAddCart.forEach( buttonAddCart => { // STEP 4 (Carrito) - Agregar un forEach a los botones para que los recorra todos
       buttonAddCart.addEventListener('click', addToCart); // STEP 5 (Carrito) - Agregarle un evento a cada boton donde llame a la funcion de agregar al carrito
    });
};

function addToCart(event) { // STEP 5 (Carrito) - Crear la funcion

    const idButton = event.currentTarget.id; // STEP 6 (Carrito) - Aqui se guarda el ID del evento (click) en la variable idButton, esto para igualar el id del producto cuando le damos click
    let productAdded = '';

    dataProducts.forEach(product => { product.id == idButton ? productAdded = product : "Not found" // STEP 7 (Carrito) - Buscar un producto donde el producto.id sea igual a idbutton, si es asi el producto agregado va a ser igual al producto
    });

   if (productsInCart.some(product => product.id == idButton)) { // STEP 8 (Carrito) - Con .some() preguntamos si el producto ya esta en el carrito. Some regresa un buleano
    const index = productsInCart.findIndex( product => product.id == idButton); // STEP 10 (Carrito) - Guardamos en la varianle el index del array del producto que la persona seleccionó (lo que seleccione de primero será el index 0 y asi secesivamente)
    productsInCart[index].quantityInCart++; // STEP 11 (Carrito) - A productos en el carrito, en la posicion del index correspndiente, se le sumará cadavez que se haga click en agregar al carrito

    localStorage.setItem('products_cart', JSON.stringify(productsInCart));
} else {
    productAdded.quantityInCart = 1; // STEP 9 (Carrito) - Le agregamos la propiedad de cantidad para que cuantificar cuantos de esos productos esta agregando al carrito
    productsInCart.push(productAdded);
    
    localStorage.setItem('products_cart', JSON.stringify(productsInCart));
};

localStorage.setItem('products_cart', JSON.stringify(productsInCart));  
    updateNumbersInCart();

    //console.log(productsInCart);


   createContentModal();
   updateTotal();
};

function updateNumbersInCart() {
    let newNumberCart = productsInCart.reduce((accumulator, product) => accumulator + product.quantityInCart, 0);
    //console.log(newNumberCart);

    numbersProductsInCart.innerHTML = newNumberCart;
};

/*---------------MODAL DEL CARRITO---------------*/

function createContentModal() {
    modalContainer.innerHTML='';
    
    productsInCart.forEach( productInCart => {
        const {name,quantityInCart, image} = productInCart;

        modalContainer.innerHTML += `
        <div class="modalContent"> 
            <img src="../Img/frutasyverduras/${image}" width="80px">
            <div class="textContentModal">
                <h3 class="cantidadCarritoModal text">${name}</h3>
                <p class="textCantidadEnCarrito text">Cantidad: <button class="minus">-</button> ${quantityInCart} <button class="plus">+</button></p>
                
            </div>
        </div>
        
        `;
        modalContainerMain.appendChild(modalContainer);
    });

    updateButtonsPlus();
    updateButtonsMinus();

};

function updateButtonsPlus() {
    plus = document.querySelectorAll('.plus');

    plus.forEach( event => {
        event.addEventListener('click', add);
    });
};

function updateButtonsMinus() {
    minus = document.querySelectorAll('.minus');

    minus.forEach( event => {
        event.addEventListener('click', subtract);
    });
};


function add() {
    const index = Array.from(document.querySelectorAll('.plus')).indexOf(event.target); // Obtener el índice del botón plus clicado
    const productInCart = productsInCart[index];

    if (productInCart) {
        productInCart.quantityInCart++; // Incrementar la cantidad del producto en el carrito
        localStorage.setItem('products_cart', JSON.stringify(productsInCart)); // Actualizar el localStorage
    };

    createContentModal();
    updateTotal();
    updateNumbersInCart();
    //console.log(productsInCart);
}

function subtract() {
    const index = Array.from(document.querySelectorAll('.minus')).indexOf(event.target); 
    const productInCart = productsInCart[index];

    if (productInCart) {
        productInCart.quantityInCart--;

        if (productInCart.quantityInCart <= 0) {
            productsInCart.splice(productInCart, 1);
        };
        
        localStorage.setItem('products_cart', JSON.stringify(productsInCart));
    };

    createContentModal();
    updateTotal();
    updateNumbersInCart();
    //console.log(productsInCart);
}


function updateTotal(){

    const totalCalculado = productsInCart.reduce( (accumulator, product) => accumulator+ (product.pricePound*product.quantityInCart), 0 );

    totalPrice.innerText = `Valor de la compra: $ ${totalCalculado}`;
};

