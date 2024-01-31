import { numeroCarrito, logout} from "./commonFunctions.js";


/* Listeners */
document.addEventListener("DOMContentLoaded", () => {
  saludar();
  numeroCarrito()
});


/* Funciones */
/* Función para llenar el perfil */
function saludar() {
  const saludo = document.querySelector("#titulo-principal");
  const informacionPerfil = document.querySelector("#informacion-perfil");
  const nombreTitulo= document.querySelector('#titulo-card-perfil')
  const stringFormArray = localStorage.getItem("login_success");
  const array = JSON.parse(stringFormArray);

  saludo.innerHTML = `Hola ${array.name}!`;

  informacionPerfil.innerHTML = `
            <p>Edad: ${array.age}</p>
            <p>Cedula: ${array.id}</p>
            <p>Correo electrónico: ${array.email}</p>
            <p>Dirección: ${array.address}</p>
            `;

 nombreTitulo.innerHTML=`<h1>${array.name}</h1>`
}

logout()

/* Función para llenar el historial de compras */
/* function llenarHistorial(){
    console.log('historial');
    const informacionHistorial = document.querySelector("#informacion-perfil");
    const saludoHistorial = document.querySelector("#titulo-principal");

    saludoHistorial.innerHTML = `Historial de compras`

    informacionHistorial.innerHTML = `<p> No ha hecho ninguna compra </p>`
} */




