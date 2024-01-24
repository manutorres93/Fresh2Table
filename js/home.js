const opcionHistorial= document.querySelector('#historial')
const opcionPerfil =document.querySelector('#perfil')


document.addEventListener("DOMContentLoaded", () => {
  saludar();
});


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

function llenarHistorial(){
    console.log('historial');
    const informacionHistorial = document.querySelector("#informacion-perfil");
    const saludoHistorial = document.querySelector("#titulo-principal");

    saludoHistorial.innerHTML = `Historial de compras`

    informacionHistorial.innerHTML = `<p> No ha hecho ninguna compra </p>`
}

/* botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
})) */

/* const productos = [
    // Abrigos
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        imagen: "./Img/banano.png",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: "./Img/pantalones/01.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    
]; */

/* let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    }) */

const contenedorInformacion = document.querySelector("#contenedor-informacion"); //no se usará
/* const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
 */

/* botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
})) */

//no se usará
/* function cargarProductos() {

    //contenedorProductos.innerHTML = "";

    console.log('hola');

    productos.forEach(producto => {

        console.log('hola');
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <img src="Img/${producto.categoria.id}/${producto.id}.jpg" alt="${producto.titulo}" class="producto-imagen">
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorInformacion.append(div);
    })

    //actualizarBotonesAgregar();
}


cargarProductos() */
/* 
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
} */

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
