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

function showHistory(userData) {
  console.log(userData.shopHistory);

  let arrayShopHistory = userData.shopHistory;
  let arrayElementsBought = userData.shopHistory[0].shop;

  if (userData.shopHistory) {
    console.log(userData.name);
    console.log(userData.shopHistory[0].shop);
    console.log(userData.shopHistory[0].price);
    console.log(userData.shopHistory[0].date);
    console.log(arrayShopHistory);
    console.log(arrayElementsBought);

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

      modalAcciones(arrayElementsBought);
    });
  } else {
    console.log("no hay compras");
  }
}

function modalAcciones(arrayElementsBought) {
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

  llenarModal(arrayElementsBought)

}


function llenarModal(arrayElementsBought){

  const tTable = document.querySelector(".tbody");

  arrayElementsBought.forEach((element) => {
    const { name, quantity,image } = element;

    console.log(name);
    tTable.innerHTML += `
   
            <tr>
            <td><img  src="/Img/Frutas/${image}" width="50px" /></td>
            <td>${name}</td>
            <td>${quantity}</td>
            </tr>
            
  `;
  });

}