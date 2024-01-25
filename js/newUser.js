import { createNewUser } from "./API.js";

const form = document.querySelector("#signup-form");

form.addEventListener("submit", createUser);

function createUser(e) {
  e.preventDefault();

  /* captura de valores de inputs/selects del formulario */
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const age = document.querySelector("#age").value;
  const id = document.querySelector("#id").value;
  const address = document.querySelector("#address").value;

  const user = {
    name,
    email,
    password,
    age,
    id,
    address,
  };

  console.log(user);

  createNewUser(user);
}
