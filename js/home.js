const opcionHistorial= document.querySelector('#historial')
const opcionPerfil =document.querySelector('#perfil')

/* Listeners */
document.addEventListener("DOMContentLoaded", () => {
  saludar();
});

/* Listeners para cambio en el css al darle al nombre perfil- historial de compras */
opcionHistorial.addEventListener('click', ()=>{
    opcionHistorial.classList.add("active");
    opcionPerfil.classList.remove("active");
    llenarHistorial()
    
})

opcionPerfil.addEventListener('click', ()=>{
    opcionHistorial.classList.remove("active");
    opcionPerfil.classList.add("active");
    saludar()
    
})

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

/* Función para llenar el historial de compras */
function llenarHistorial(){
    console.log('historial');
    const informacionHistorial = document.querySelector("#informacion-perfil");
    const saludoHistorial = document.querySelector("#titulo-principal");

    saludoHistorial.innerHTML = `Historial de compras`

    informacionHistorial.innerHTML = `<p> No ha hecho ninguna compra </p>`
}


/* Logout */
const user = JSON.parse(localStorage.getItem("login_success")) || false;

if (user === false) {
  window.location.href = "loginregister.html";
}

const logout = document.querySelector("#logout");

logout.addEventListener("click", () => {
  alert("Hasta pronto");
  localStorage.removeItem("login_success");
  window.location.href = "index.html";
});
