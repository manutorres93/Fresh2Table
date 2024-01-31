//Cambia el numero del carrito

export function numeroCarrito(){

  let productsInCart= JSON.parse(localStorage.getItem('products_cart')) //productos en carito

  let newNumberCart = productsInCart.reduce((accumulator, product) => accumulator + product.quantityInCart, 0);
  console.log(newNumberCart);
  
  const numberCart= document.querySelector('#numerito')
  
  numberCart.innerText=newNumberCart

  console.log(newNumberCart);

  
  
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
