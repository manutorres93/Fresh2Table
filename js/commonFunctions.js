//Cambia el numero del carrito

export function numeroCarrito(){

    let numeroCarrito;
    //Esta primera parte es función del carrito, verificar si se puede hacer una osla función, exportarla y traerla aqui
    let products_cart= JSON.parse(localStorage.getItem('products_cart')) //productos en carito
  
    if(products_cart){
      numeroCarrito= products_cart.length
    
    }else{
  
      //localStorage.setItem("products_cart", JSON.stringify(products));
      products_cart= JSON.parse(localStorage.getItem('products_cart'))
      numeroCarrito= products_cart.length
  
    }
  
    const numberCart= document.querySelector('#numerito')
  
    numberCart.innerText=numeroCarrito
  
    console.log(numeroCarrito);
  
  }

/* Logout */

export function logout() {

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
    
}
