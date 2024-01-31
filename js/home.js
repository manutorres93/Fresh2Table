import { numeroCarrito, logout} from "./commonFunctions.js";
//import { editNewUser } from "./API.js";

const informacionPerfil = document.querySelector("#informacion-perfil");

/* Listeners */
document.addEventListener("DOMContentLoaded", () => {
  saludar();
  numeroCarrito()
});

let cedulaUSer
/* Funciones */
/* Función para llenar el perfil */

logout()

function saludar() {
  const saludo = document.querySelector("#titulo-principal");
  const nombreTitulo= document.querySelector('#titulo-card-perfil')
  const stringFormArray = localStorage.getItem("login_success");
  const array = JSON.parse(stringFormArray);

  saludo.innerHTML = `Hola ${array.name}!`;

  informacionPerfil.innerHTML = `
            <p>Edad: ${array.age}</p>
            <p>Cedula: ${array.id}</p>
            <p>Correo electrónico: ${array.email}</p>
            <p>Dirección: ${array.address}</p>

            <button class="historial-acciones-detalles btn-abrir-modal" idUser="${array.id}">Ver más</button>
            `;

 nombreTitulo.innerHTML=`<h1>${array.name}</h1>`

 cedulaUSer=array.id
  console.log(cedulaUSer);

  modalAcciones()

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

  getDataUserEdit(cedulaUsuario)
  

} 

async function getDataUserEdit(idUser) {
  try {
    const response = await fetch(
      `http://localhost:4000/usuarios/${idUser}`
    ); //conexion al recurso
    const datos = await response.json(); //consumo del recurso, datos es un array tipo JSON
    

    getModalInformation(datos);
  } catch (error) {}
}


function getModalInformation(information) {
  const modalBody = document.querySelector(".modal-body");
  const { name, age, email, address} = information;
  

  modalBody.innerHTML=`
  <p>Información del usuario</p>

  <label>Nombre:</label>
  <input type="text" id="nombre" value="${name}">
  <label>Cedula</label>
  <input type="text" id="edad" value="${age}">
  <label>Email:</label>
  <input type="email" id="email" value="${email}">
  <label>Dirección:</label>
  <input type="text" id="direccion" value="${address}">
  
  `
guardarDatos()
  
}

function guardarDatos() {
  // Obtener el valor del input
  const inputNombre = document.getElementById('nombre');
  const inputEdad = document.getElementById('edad');
  const inputEmail = document.getElementById('email');
  const inputDireccion = document.getElementById('direccion');

  const btnGuardar = document.querySelector('#btn-guardar-modal');
 

  btnGuardar.addEventListener('click',()=>{
    const newValueName = inputNombre.value;
    const newValueAge = inputEdad.value;
    const newValueEmail = inputEmail.value;
    const newValueAddress = inputDireccion.value;
    console.log('Se guardó el valor:', newValueName);
    console.log('Se guardó el valor:', newValueAge);
    console.log('Se guardó el valor:', newValueEmail);
    console.log('Se guardó el valor:', newValueAddress);

  })

}




