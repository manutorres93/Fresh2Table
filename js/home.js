import { numeroCarrito, logout } from "./commonFunctions.js";
//import { editNewUser } from "./API.js";

const informacionPerfil = document.querySelector("#informacion-perfil");

/* Listeners */
document.addEventListener("DOMContentLoaded", () => {
  saludar();
  numeroCarrito();
});

let cedulaUSer;
/* Funciones */
/* Función para llenar el perfil */

logout();

function saludar() {
  const saludo = document.querySelector("#titulo-principal");
  const nombreTitulo = document.querySelector("#titulo-card-perfil");
  const stringFormArray = localStorage.getItem("login_success");
  const array = JSON.parse(stringFormArray);

  saludo.innerHTML = `Hola ${array.name}!`;

  informacionPerfil.innerHTML = `
            <p>Edad: ${array.age}</p>
            <p>Cedula: ${array.id}</p>
            <p>Correo electrónico: ${array.email}</p>
            <p>Dirección: ${array.address}</p>

            <button class="btn historial-acciones-detalles btn-abrir-modal" idUser="${array.id}">Editar datos</button>
            `;

  nombreTitulo.innerHTML = `<h1>${array.name}</h1>`;

  cedulaUSer = array.id;
  console.log(cedulaUSer);

  modalAcciones();

  informacionPerfil.addEventListener("click", cargarModal);
}

function modalAcciones() {
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
}

function cargarModal(iterador) {
  const cedulaUsuario = iterador.target.getAttribute("idUser");

  getDataUserEdit(cedulaUsuario);
}

async function getDataUserEdit(idUser) {
  try {
    const response = await fetch(`http://localhost:4000/usuarios/${idUser}`); //conexion al recurso
    const datos = await response.json(); //consumo del recurso, datos es un array tipo JSON

    getModalInformation(datos);
    guardarDatos();
  } catch (error) {}
}

function getModalInformation(information) {
  const modalBody = document.querySelector(".modal-body");
  const { name, age, email, address } = information;

  modalBody.innerHTML = `
  

  <div class="form-group">
                <label class="label-modal" for="nombre">Nombre:</label>
                <input class="input-modal" type="text" class="form-control" id="nombre" value="${name}">
            </div>
            <div class="form-group">
                <label class="label-modal" for="edad">Cédula:</label>
                <input class="input-modal" type="text" class="form-control" id="edad" value="${age}">
            </div>
            <div class="form-group">
                <label class="label-modal" for="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">Email:</label>
                <input class="input-modal" type="email" class="form-control" id="email" value="${email}">
            </div>
            <div class="form-group">
                <label class="label-modal" for="direccion">Dirección:</label>
                <input class="input-modal" type="text" class="form-control" id="direccion" value="${address}">
            </div>
  
  `;
  
}

function guardarDatos() {
  // Obtener el valor del input
  const inputNombre = document.getElementById("nombre");
  const inputEdad = document.getElementById("edad");
  const inputEmail = document.getElementById("email");
  const inputDireccion = document.getElementById("direccion");

  const btnGuardar = document.querySelector("#btn-guardar-modal");

  btnGuardar.addEventListener("click", () => {
    const newValueName = inputNombre.value;
    const newValueAge = inputEdad.value;
    const newValueEmail = inputEmail.value;
    const newValueAddress = inputDireccion.value;
    console.log("Se guardó el valor:", newValueName);
    console.log("Se guardó el valor:", newValueAge);
    console.log("Se guardó el valor:", newValueEmail);
    console.log("Se guardó el valor:", newValueAddress);
  });
}
