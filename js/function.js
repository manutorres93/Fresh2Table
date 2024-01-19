/*---------------CARGAR LA BASE DE DATOS--------------- */

document.addEventListener('DOMContentLoaded', ()=>{ /* Mientras se cargue el DOM, a a ocurrir lo que haya adentro */
    showProducts(products); /* En este caso mostrar los productos */

});

/*---------------SELECTORES---------------*/

const inputSearch = document.getElementById('input-search')


/*---------------BUSCADOR---------------*/



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
        <img src="/Img/${product.image}" alt="">
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

        
    inputSearch.addEventListener('keyup', event =>{
        const prueba = document.getElementById('prueba')

        prueba.innerHTML = `
        <p>${event.target.value}</p>
        `
        
        //console.log(products.name);

        // if (event.target.matches('.productName')) {
            
        //     document.querySelectorAll(products.forEach( fruit =>{

        //         fruit.textContent.includes(event.target.value)
        //             ?fruit.classList.remove('filtro')
        //                 :fruit.classList.add('filtro')
        //     }));
        // };
    
    });
};

