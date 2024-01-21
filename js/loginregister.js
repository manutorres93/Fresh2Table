/* Para que se desplace el div de registro, creación de clase active que tiene las propiedades en el css*/

const container = document.querySelector(".container");
const signupButton = document.querySelector(".signup-section h1");
const loginButton = document.querySelector(".login-section h1");

loginButton.addEventListener("click", () => {
  container.classList.remove("active");
});

signupButton.addEventListener("click", () => {
  container.classList.add("active");
});


/* Cargar la db inicial, que se traiga desde JS */
document.addEventListener("DOMContentLoaded", () => {

  const user = JSON.parse(localStorage.getItem('users')) || false

  console.log(user);

  if (!user) {
    localStorage.setItem("users", JSON.stringify(usuarios));
    console.log(usuarios);
}
  
});

/* Para la base de datos con localStorage, para el registro*/

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const age = document.querySelector("#age").value;
  const id = document.querySelector("#id").value;
  const address = document.querySelector("#address").value;

  console.log(email);
  console.log(password);

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const isUserRefistered = users.find((user) => user.email === email);

  if (isUserRefistered) {
    //redirección a login
    container.classList.remove("active");
    return alert("El usuario ya está registrado");
  }

  users.push({ name: name, email: email, password: password,age: age,   
  id: id,
  address: address });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registro exitoso");

  console.log(users);
  console.log(typeof users);

  //Redirección a login

  container.classList.remove("active");
});

/* Para el login */

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); //para que no se recargue la pagina

  const email = document.querySelector("#email-login").value;
  const password = document.querySelector("#password-login").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const validUser = users.find(
    (user) => user.email === email && user.password === password
  );

  console.log(validUser);

  if (!validUser) {
    alert("Usuario y/o contraseña incorrectos");
  } else {
    alert(`Bienvenido ${validUser.name}`);
    localStorage.setItem("login_success", JSON.stringify(validUser));
    window.location.href = "home.html";
  }
});

/* Descomentando esto "seteo" lo que carga en el DOM inicialmente de la db */
/* localStorage.removeItem('users') */