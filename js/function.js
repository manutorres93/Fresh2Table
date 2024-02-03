/*---------------CARGAR LA BASE DE DATOS--------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Cargar el archivo JSON
    fetch('../js/products.json')
      .then(response => {return response.json()})
      .then(data => {
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
const modalContent = document.querySelector('.modalContent');
let buttonsAddCart = document.querySelectorAll('.buttonsAddCart'); // STEP 1 (Carrito) - Crear una variable para el boton de agregar al carrito

const productsInCart = [];
let dataProducts = '';

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
                <p class="productDescription">${product.description}</p>
            </div>
            
            <div class="price">
                <p class="productPrice"> $ ${product.pricePound} COP</p>
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
                <p class="productDescription">${product.description}</p>
            </div>
            
            <div class="price">
                <p class="productPrice"> $ ${product.pricePound
                
                } COP</p>
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

   } else {
    productAdded.quantityInCart = 1; // STEP 9 (Carrito) - Le agregamos la propiedad de cantidad para que cuantificar cuantos de esos productos esta agregando al carrito
    productsInCart.push(productAdded);

   };

   updateNumbersInCart();
   
   console.log(productsInCart);
   
   localStorage.setItem('products_cart', JSON.stringify(productsInCart));
   
//    productsInCart.forEach(i => {
//     console.log('---------------------------------------------------------------');
//     console.log(i);
//     console.log('UNO MAS');
//     })
   createContentModal();
};

function updateNumbersInCart() {
    let newNumberCart = productsInCart.reduce((accumulator, product) => accumulator + product.quantityInCart, 0);
    //console.log(newNumberCart);

    numbersProductsInCart.innerHTML = newNumberCart;
};

function createContentModal() {
    
    modalContent.innerHTML=''
    
    const modalContent = document.createElement('div');
    
    productsInCart.forEach((i) => {
        
        const {name,quantityInCart}=i


        //console.log(i);
        
        const productElement = document.createElement('p');

        productElement.textContent = `${name} - Cantidad: ${quantityInCart}`;

        modalContent.appendChild(productElement);
    })
    
    modalContent.appendChild(productElement)
}
