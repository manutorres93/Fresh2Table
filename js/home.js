import { numeroCarrito, logout } from "./commonFunctions.js";
import { editUser, getUsersById } from "./API.js";

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

  cedulaUSer = array.id;
  console.log(cedulaUSer);
  
  async function usuarioID() {
    const dataUSer= await getUsersById(cedulaUSer)
    console.log(dataUSer);
    console.log(dataUSer.name);

    saludo.innerHTML = `Hola ${dataUSer.name}!`;

    informacionPerfil.innerHTML = `
              <p>Edad: ${dataUSer.age}</p>
              <p>Cedula: ${dataUSer.id}</p>
              <p>Correo electrónico: ${dataUSer.email}</p>
              <p>Dirección: ${dataUSer.address}</p>
  
              <button class="btn historial-acciones-detalles btn-abrir-modal" idUser="${dataUSer.id}">Editar datos</button>
              `;
  
    nombreTitulo.innerHTML = `<h1>${dataUSer.name}</h1>`;

    modalAcciones();

    informacionPerfil.addEventListener("click", cargarModal);
    
  }

  usuarioID()


  
  
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
    saludar()
  });

  btnCerrarModalAux.addEventListener("click", () => {
    modal.close();
    saludar()
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
    guardarDatos(idUser,datos);
    
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

function guardarDatos(idUser, datos) {
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

    const shopHistory = datos.shopHistory || [];

    const updateUser = {
      name: newValueName,
      email: newValueEmail,
      age: newValueAge,
      address: newValueAddress,
      password: datos.password,
      shopHistory:shopHistory
    };

    console.log(updateUser);

    editUser(updateUser, idUser);

    saludar()
  });

  
}
