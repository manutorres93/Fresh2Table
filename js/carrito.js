/* ------CARGA INICIAL DE LOCALSTORAGE SETEANDO PRODUCTOS PARA EJEMPLO---- */

document.addEventListener("DOMContentLoaded", () => {

const products_cart = JSON.parse(localStorage.getItem('products_cart'));
console.log(products_cart);

if(products_cart){
    
    cargarProductosCarrito()
}else{ //lo más seguro es que tenga que eliminar esto cuando ya funcione lo de juanes, ya que lo que quiero cargar es si o si lo que hay en local storage

    localStorage.setItem("products_cart", JSON.stringify(products));
}

/* Para setear el localStorage del carrito*/
/*  localStorage.removeItem('products_cart')  */

})


/* ------SELECTORES--------- */

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");



/* -----TRAER PRODUCTOS DEL LOCALSTORAGE */
const products_cart= JSON.parse(localStorage.getItem('products_cart')) //productos en carito
console.log(products_cart);

/* Pintar el carrito de compras dentro del perfil */

function cargarProductosCarrito(){ //Carga todo lo que hay en localStorage

    if(products_cart && products_cart.length>0){
        contenedorCarritoVacio.classList.add('disabled')
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        //contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML=''
    
        products_cart.forEach(product => {
    
            const {image, name,pricePound, quantity,id}=product
        
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="/Img/${image}" alt="${image}">
                <div class="carrito-producto-titulo">
                    <small>Producto</small>
                    <h3>${name}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${quantity}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${pricePound}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${quantity*pricePound}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
       
        
    
    }else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
       
    
    }

    actualizarBotonesEliminar()

    actualizarTotal()
}


/* ---Función para eliminar productos del LS, por ende, del carrito */



let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");//es let porque se carga inicialmente otras cosas y tiene que volver a cargarse

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar"); //para que se reasignen cada vez que se creen los productos en el for each

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}


function eliminarDelCarrito(e) {
    const idBoton= e.currentTarget.id
    console.log(idBoton); //me imprime el id del producto al que estoy clickeando

    const idBotonString = idBoton.toString();

    //Buscar cual es el producto en el array

    const productoEliminado = products_cart.find(product => product.id.toString() === idBotonString);

    console.log(productoEliminado);

    const index= products_cart.findIndex(product =>product.id.toString() === idBotonString)

    console.log(products_cart);
    products_cart.splice(index,1)
    console.log(products_cart);

    cargarProductosCarrito() //Hasta aqui se elimina y se pinta pero si recargo se vuelve a cargar todo porque no se ha eliminado de LS

    localStorage.setItem('products_cart', JSON.stringify(products_cart))

}


/* ---Función para vaciar el carrito entero */

botonVaciar.addEventListener('click', vaciarCarrito)

function vaciarCarrito(){
    products_cart.length=0
    localStorage.setItem('products_cart', JSON.stringify(products_cart))
    cargarProductosCarrito()
}

/* --- Función para actualizar el total calculado */

function actualizarTotal(){

    const totalCalculado= products_cart.reduce((acc, product)=> acc+ (product.pricePound*product.quantity),0 )

    total.innerText= `$${totalCalculado}`
}

/* ---Función para redireccionar para pagina dde compras */


botonComprar.addEventListener("click", ()=> {
    // Redirigir a index.html por ahora
    window.location.href = "index.html";
});



/* Logout */
const user = JSON.parse(localStorage.getItem('login_success')) || false

if (user=== false) {
    window.location.href='loginregister.html'
    
}

const logout =document.querySelector('#logout')

logout.addEventListener('click', ()=>{
    alert('Hasta pronto')
    localStorage.removeItem('login_success')
    window.location.href='index.html'
}) 