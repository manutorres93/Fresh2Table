/*---------------CARGAR LA BASE DE DATOS--------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Cargar el archivo JSON
    fetch('../js/products.json')
      .then(response => {return response.json()})
      .then(data => {
        // Llamar a la función showProducts con los datos cargados
        showProducts(data);
        nombre = data;
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
const iconSelectorFruits = document.querySelector('.fruits');
const iconSelectorVegetables = document.querySelector('.vegetables');
const titleFruits = document.querySelector('.titulo-frutas');
const titleVegetables = document.querySelector('.titulo-verduras');
let nombre = '';


/*---------------INYECTAR LAS CARDS--------------- */
function showProducts(products) {
    /* Selector para tarjetas */
    const cardContainer = document.querySelector('#cardContainer');
    
    products.forEach((product)=>{
        console.log(product);
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
                <p class="productPrice"> $ ${product.pricePound
                
                } COP</p>
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
    criterioSeleccionado.name = event.target.value;

    // console.log(criterioSeleccionado.name);
    
    //  STEP 5 (Buscador) - Llamar a la funcion de filtrar
    filterName(); 
});

// STEP 6 (Buscador) 
function filterName() {
    const product = nombre.filter(filterByName); // Filtra segun lo que le pasemos en los parametros

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

    cardContainer.innerHTML = `
    
    `;
};

/*---------------FILTRAR FRUTA---------------*/


function filterByCategory(category) {
    const filterProducts = nombre.filter(product => product.category === category);
    
    showFruits(filterProducts);
};

function showFruits(produtsToShow) {
    
    cleanCards();

    /*const cardContainer = document.querySelector('#cardContainer');
    cardContainer.innerHTML = '';*/
    
    produtsToShow.forEach( product => {
        const card = document.createElement('div');

        card.innerHTML = `
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
                <p class="productPrice"> $ ${product.pricePound
                
                } COP</p>
            </div>
            
            <div class="cart">
            
                <button class="addCart">
                    <p class="textAddCart">Agregar al carrito</p>
                </button>
            
            </div>
        </div>
        `;
        cardContainer.appendChild(card);
    })
    
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

/* CARRITO DE COMPRAS */



iconSelectorCart.addEventListener('click', function () {
    const modal = document.querySelector('.modal');
    const closeButton = document.querySelector('.close-button');
  
    function openModal() {
        modal.style.display = 'block';
    }
  
    function closeModal() {
        modal.style.display = 'none';
    }
  

    openModal();
  

    closeButton.addEventListener('click', function () {
        closeModal();
    });
  

  
});