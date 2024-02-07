/* Importando usuarios de db desde la API */

import { editUser, getUsers, getUsersById } from "./API.js";

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

/* Cargar la db inicial, que se traiga desde JS, lo setea en localstorage */
/* document.addEventListener("DOMContentLoaded", () => {

  const user = JSON.parse(localStorage.getItem('users')) || false

  console.log(user);

  if (!user) {
    localStorage.setItem("users", JSON.stringify(usuarios));
    console.log(usuarios);
}
  
}); */

/* Descomentando esto "seteo" lo que carga en el DOM inicialmente de la db */
/* localStorage.removeItem('users') */

/* Cargar la db inicial que la traiga de json */
let usersData;

document.addEventListener("DOMContentLoaded", () => {
  bringUsers();
  modalAcciones();
});

async function bringUsers() {
  console.log("holaaaa");
  usersData = await getUsers();

  console.log(usersData);
}

/* Para el login desde bd JSON */
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); //para que no se recargue la pagina

  const email = document.querySelector("#email-login").value; //captura los valores del formulario login
  const password = document.querySelector("#password-login").value;

  console.log(usersData);
  console.log(typeof usersData);

  const userFound = usersData.find(
    (user) => user.email === email && user.password === password
  );

  console.log(userFound);

  if (!userFound) {
    alert("Usuario y/o contraseña incorrectos");
  } else {
    alert(`Bienvenido ${userFound.name}`);

    localStorage.setItem("login_success", JSON.stringify(userFound));
    window.location.href = "home.html";
  }
});

function modalAcciones() {
  /* Funcionalidad para el modal */
  const btnAbrirModal = document.querySelector(".btn-abrir-modal");
  const btnCerrarModalAux = document.getElementById("btn-cerrar-modal-aux");
  const btnValidarModal = document.getElementById("btn-validar-modal");

  btnAbrirModal.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.showModal();
  });

  btnCerrarModalAux.addEventListener("click", () => {
    modal.close();
  });

  btnValidarModal.addEventListener("click", () => {
    validarUsuario();
  });
}

function validarUsuario() {
  const secondModal = document.querySelector("#second-modal");
  const btnCerrarModalAux = document.getElementById("btn-cerrar-modal-sec");

  const idUser = document.querySelector("#id-modal").value;
  const emailUser = document.querySelector("#email-modal").value;

  console.log(idUser);
  console.log(emailUser);

  async function validateData() {
    const dataUser = await getUsersById(idUser);

    console.log(dataUser);

    if (dataUser.email === emailUser && dataUser.id === idUser) {
      console.log("Usuario encontrado:", dataUser);
      secondModal.showModal();
      changePassword(idUser)
      

      btnCerrarModalAux.addEventListener("click", () => {
        secondModal.close();
      });
    } else if (dataUser === undefined) {
      alert("La cédula está incorrecta");
    } else {
      alert(
        "El documento está en nuestra base de datos pero no coincide con el correo"
      );
    }
  }

  validateData();




  
}


async function changePassword(idUser) {
  
  const dataUser = await getUsersById(idUser);

  console.log(dataUser);
  
  const btnChangePass = document.querySelector("#btn-modificar-modal");

  btnChangePass.addEventListener("click", () => {
    const newPass = document.querySelector("#new-password-modal").value;
    const newPassConf = document.querySelector("#new-password-modal-conf").value;

   if (newPass===newPassConf) {

    const updateUser = {
      name: dataUser.name,
      email: dataUser.email,
      age: dataUser.age,
      address: dataUser.address,
      password: newPass,
      shopHistory:dataUser.shopHistory
    };

    editUser(updateUser,idUser)



    alert('La contraseña ha sido cambiada')

    
   }else{
    alert('Las contraseñas son diferentes')
   }

    // Realizar las operaciones necesarias con las contraseñas aquí
  });
}


/* Para la base de datos con localStorage, para el registro*/

/* const signupForm = document.querySelector("#signup-form");

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
  const isUserRefistered = users.find((iterador) => iterador.email === email);

  if (isUserRefistered) {
    //redirección a login
    container.classList.remove("active");
    return alert("El usuario ya está registrado");
  }

  users.push({
    name: name,
    email: email,
    password: password,
    age: age,
    id: id,
    address: address,
  });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registro exitoso");

  console.log(users);
  console.log(typeof users);

  //Redirección a login

  container.classList.remove("active");
});
 */
/* Para el login */

//const loginForm = document.querySelector("#login-form");

/* loginForm.addEventListener("submit", (e) => {
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
 */
