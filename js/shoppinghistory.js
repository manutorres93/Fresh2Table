import { numeroCarrito, logout } from "./commonFunctions.js";

/* Importando usuarios de db desde la API */
import { getUsers } from "./API.js";

document.addEventListener("DOMContentLoaded", () => {
  const userInformation = JSON.parse(localStorage.getItem("login_success"));
  console.log(userInformation);
  numeroCarrito();
  /*   bringUsers() */
  showHistory(userInformation);
});

//Creo que no voy a tener que traerlos todos, porque ya me traje la info del que se loggeo
/* let usersData;

async function bringUsers() {
    console.log("holaaaa");
    usersData = await getUsers();
  
    console.log(usersData);
  } */

logout();

//Traer usuario desde LS

/* ---Selectores---- */

const contenedorhistorialVacio = document.querySelector("#historial-vacio");
const contenedorhistorialProductos = document.querySelector(
  "#historial-productos"
);
//const btnAbrirModal= document.querySelector('.btn-abrir-modal')
const btnCerrarModal = document.querySelector("#btn-cerrar-modal");
//const modal= document.querySelector('#modal')

function showHistory(userData) {
  console.log(userData.shopHistory);

  let arrayShopHistory = userData.shopHistory;

  if (userData.shopHistory) {
    console.log(userData.name);
    console.log(userData.shopHistory[0].shop);
    console.log(userData.shopHistory[0].price);
    console.log(userData.shopHistory[0].date);
    console.log(arrayShopHistory);

    contenedorhistorialVacio.classList.add("disabled");
    contenedorhistorialProductos.classList.remove("disabled");

    contenedorhistorialProductos.innerHTML = "";

    arrayShopHistory.forEach((compra) => {
      const { price, date, id } = compra;

      console.log(price);
      console.log(date);

      const div = document.createElement("div");
      div.classList.add("historial-producto");
      div.innerHTML = `
        
        <div class="historial-producto-titulo">
            <h3>Referencia de compra</h3>
            <p>${id}</p>
        </div>
        <div class="historial-producto-fecha">
            <h3>Fecha de compra</h3>
            <p>${date}</p>
        </div>
        <div class="historial-producto-total">
            <h3>Total</h3>
            <p>${price}</p>
        </div>

        <button class="historial-acciones-detalles btn-abrir-modal" id="${id}">Ver más</button>
        
       
        
          
    `;

      contenedorhistorialProductos.append(div);


    /* Funcionalidad para el modal */
      const btnAbrirModal = document.querySelector(".btn-abrir-modal");
      const btnCerrarModal = document.getElementById("btn-cerrar-modal");
      const btnCerrarModalAux = document.getElementById("btn-cerrar-modal-aux");

      btnAbrirModal.addEventListener("click", () => {
        const modal = document.getElementById("modal");
        modal.showModal(); 
      });

      
      btnCerrarModal.addEventListener("click", () => {
        modal.close();
      });

      btnCerrarModalAux.addEventListener("click", () => {
        modal.close();
      });
    });
  } else {
    console.log("no hay compras");
  }
}

btnAbrirModal.addEventListener("click", () => {
  modal.show();
  console.log("hola!|");
});

/* Traer información y pintarla en HTML */

// /* ------CARGA INICIAL DE LOCALSTORAGE SETEANDO PRODUCTOS PARA EJEMPLO---- */

// document.addEventListener("DOMContentLoaded", () => {
//   const products_cart = JSON.parse(localStorage.getItem("products_cart"));

//   if (products_cart) {
//     cargarProductoshistorial();
//   } else {
//     //lo más seguro es que tenga que eliminar esto cuando ya funcione lo de juanes, ya que lo que quiero cargar es si o si lo que hay en local storage

//     localStorage.setItem("products_cart", JSON.stringify(products));
//   }

//   /* Para setear el localStorage del carrito*/
//   /*  localStorage.removeItem('products_cart')  */
// });

/* ------SELECTORES--------- */

// const contenedorhistorialVacio = document.querySelector("#historial-vacio");
// const contenedorhistorialProductos = document.querySelector("#historial-productos");
// const contenedorhistorialAcciones = document.querySelector("#historial-acciones");
// const botonVaciar = document.querySelector("#historial-acciones-vaciar");
// const contenedorTotal = document.querySelector("#total");
// const botonComprar = document.querySelector("#historial-acciones-comprar");

// /* -----TRAER PRODUCTOS DEL LOCALSTORAGE */
// const products_cart = JSON.parse(localStorage.getItem("products_cart")); //productos en carito
// console.log(products_cart);

// /* Pintar el carrito de compras dentro del perfil */

// function cargarProductoshistorial() {
//   //Carga todo lo que hay en localStorage

//   if (products_cart && products_cart.length > 0) {
//     contenedorhistorialVacio.classList.add("disabled");
//     contenedorhistorialProductos.classList.remove("disabled");
//     contenedorhistorialAcciones.classList.remove("disabled");
//     //contenedorhistorialComprado.classList.add("disabled");

//     contenedorhistorialProductos.innerHTML = "";

//     products_cart.forEach((product) => {
//       const { image, name, pricePound, quantity, id } = product;

//       const div = document.createElement("div");
//       div.classList.add("historial-producto");
//       div.innerHTML = `
//                     <img class="historial-producto-imagen" src="/Img/${image}" alt="${image}">
//                     <div class="historial-producto-titulo">
//                         <small>Producto</small>
//                         <h3>${name}</h3>
//                     </div>
//                     <div class="historial-producto-cantidad">
//                         <small>Cantidad</small>
//                         <p>${quantity}</p>
//                     </div>
//                     <div class="historial-producto-precio">
//                         <small>Precio</small>
//                         <p>${pricePound}</p>
//                     </div>
//                     <div class="historial-producto-subtotal">
//                         <small>Subtotal</small>
//                         <p>${quantity * pricePound}</p>
//                     </div>
//                     <button class="historial-producto-eliminar" id="${id}"><i class="bi bi-trash-fill"></i></button>
//                 `;

//       contenedorhistorialProductos.append(div);
//     });
//   } else {
//     contenedorhistorialVacio.classList.remove("disabled");
//     contenedorhistorialProductos.classList.add("disabled");
//     contenedorhistorialAcciones.classList.add("disabled");
//   }

//   actualizarBotonesEliminar();

//   actualizarTotal();
// }

// /* ---Función para eliminar productos del LS, por ende, del historial */

// let botonesEliminar = document.querySelectorAll(".historial-producto-eliminar"); //es let porque se carga inicialmente otras cosas y tiene que volver a cargarse

// function actualizarBotonesEliminar() {
//   botonesEliminar = document.querySelectorAll(".historial-producto-eliminar"); //para que se reasignen cada vez que se creen los productos en el for each

//   botonesEliminar.forEach((boton) => {
//     boton.addEventListener("click", eliminarDelhistorial);
//   });
// }

// function eliminarDelhistorial(e) {
//   const idBoton = e.currentTarget.id;
//   console.log(idBoton); //me imprime el id del producto al que estoy clickeando

//   const idBotonString = idBoton.toString();

//   //Buscar cual es el producto en el array

//   const productoEliminado = products_cart.find(
//     (product) => product.id.toString() === idBotonString
//   );

//   console.log(productoEliminado);

//   const index = products_cart.findIndex(
//     (product) => product.id.toString() === idBotonString
//   );

//   console.log(products_cart);
//   products_cart.splice(index, 1);
//   console.log(products_cart);

//   cargarProductoshistorial(); //Hasta aqui se elimina y se pinta pero si recargo se vuelve a cargar todo porque no se ha eliminado de LS

//   localStorage.setItem("products_cart", JSON.stringify(products_cart));
// }

// /* ---Función para vaciar el historial entero */

// botonVaciar.addEventListener("click", vaciarhistorial);

// function vaciarhistorial() {
//   products_cart.length = 0;
//   localStorage.setItem("products_cart", JSON.stringify(products_cart));
//   cargarProductoshistorial();
// }

// /* --- Función para actualizar el total calculado */

// function actualizarTotal() {
//   const totalCalculado = products_cart.reduce(
//     (acc, product) => acc + product.pricePound * product.quantity,
//     0
//   );

//   total.innerText = `$${totalCalculado}`;
// }

// /* ---Función para redireccionar para pagina dde compras */

// botonComprar.addEventListener("click", () => {
//   // Redirigir a index.html por ahora
//   window.location.href = "index.html";
// });
