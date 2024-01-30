

const btn = document.querySelector("#btn-initial");
const header = document.querySelector("header");
const btnMenu = document.querySelector('#btn-menu');

btn.addEventListener("click",()=>{
    header.style.backgroundColor="#008000"
    header.style.display =" flex"

})

btnMenu.addEventListener('click', function () {
    const modal = document.querySelector('.modal');
    const btnExit = document.querySelector('#btn-exit');
  
    function openModal() {
        modal.style.display = 'block';
    }
  
    function closeModal() {
        modal.style.display = 'none';
    }
  

    openModal();
  

    btnExit.addEventListener('click', function () {
        closeModal();
    });
  

  
});