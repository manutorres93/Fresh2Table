

const btn = document.querySelector("#btn-initial");
const header = document.querySelector("header");
const btnMenu = document.querySelector('#btn-menu');

btn.addEventListener("click", () => {
/*     header.style.backgroundColor = "#008000" */
    header.style.display = " flex"

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

const content = document.querySelector('#content');
const btnPrev = document.querySelector('#btn-minus');
const btnNext = document.querySelector('#btn-plus');
let x = 1;


const array2 = [
    {
        id: 0,
        nombre: "Finca Manuelita",
        imagen: "IMG1.png",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    },
    {
        id: 0,
        nombre: "Finca Manuelita",
        imagen: "IMG2.png",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    },  
    {
        id: 0,
        nombre: "Finca Manuelita",
        imagen: "IMG3.png",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    },



]

const contenido = document.createElement('div')

document.addEventListener('DOMContentLoaded', () => {
    /*     content.innerHTML = `${array[0]} , ${array[1]}`; */
    showFirst()
})


function showFirst() {
    contenido.className = "hola"
    contenido.innerHTML = `
    <div class="card" style="background-image: url(../Img/${array2[0].imagen});">
        <div class="content-card" >
            <h1>${array2[0].nombre}</h1>
            <p>${array2[0].description} </p>
            <div class="location-card"> <img src="../Img/Icons/location_on_FILL1_wght400_GRAD0_opsz24.svg" alt=""> Medellin, Colombia</div>
        </div>

    </div>
    <div class="card" style="background-image: url(../Img/${array2[1].imagen});">
        <div class="content-card" >
             <h1>${array2[1].nombre}</h1>
            <p>${array2[1].description} </p>
            <div class="location-card">  <img src="../Img/Icons/location_on_FILL1_wght400_GRAD0_opsz24.svg" alt=""> Medellin, Colombia</div>
        </div>

    </div>

    `
    content.appendChild(contenido);
}

btnPrev.addEventListener('click', () => {
    updateValue(false)
    console.log(x);
})


btnNext.addEventListener('click', () => {
    updateValue(true)
    console.log(x);
})


function updateValue(status) {
    if (status) {
        if (x < array2.length - 1) {
            contenido.innerHTML = `
            <div class="card" style="background-image: url(../Img/${array2[x].imagen});">
        <div class="content-card" >
            <h1>${array2[x].nombre}</h1>
            <p>${array2[x].description} </p>
            <div class="location-card"> <img src="../Img/Icons/location_on_FILL1_wght400_GRAD0_opsz24.svg" alt=""> Medellin, Colombia</div>
        </div>

    </div>
    <div class="card" style="background-image: url(../Img/${array2[x+1].imagen});">
        <div class="content-card" >
             <h1>${array2[x+1].nombre}</h1>
            <p>${array2[x+1].description} </p>
            <div class="location-card"> <img src="../Img/Icons/location_on_FILL1_wght400_GRAD0_opsz24.svg" alt=""> Medellin, Colombia</div>
        </div>

    </div>
    
 `;
            x++;
        } else {
            x = 0
            contenido.innerHTML = `
            <div class="card" style="background-image: url(../Img/${array2[array2.length - 1].imagen});">
        <div class="content-card" >
            <h1>${array2[array2.length - 1].nombre}</h1>
            <p>${array2[array2.length - 1].description} </p>
            <div class="location-card"> <img src="../Img/Icons/location_on_FILL1_wght400_GRAD0_opsz24.svg" alt=""> Medellin, Colombia</div>
        </div>

    </div>
    <div class="card" style="background-image: url(../Img/${array2[x].imagen});">
        <div class="content-card" >
             <h1>${array2[x].nombre}</h1>
            <p>${array2[x].description} </p>
            <div class="location-card"> <img src="../Img/Icons/location_on_FILL1_wght400_GRAD0_opsz24.svg" alt=""> Medellin, Colombia</div>
        </div>

    </div>
    
`
            
            ;
        }
        content.appendChild(contenido);

    } else {

        if (x > 0) {
            x--;
            contenido.innerHTML = `
            <div class="card" style="background-image: url(../Img/${array2[x].imagen});">
        <div class="content-card" >
            <h1>${array2[x].nombre}</h1>
            <p>${array2[x].description} </p>
            <div class="location-card"> <img src="../Img/Icons/location_on_FILL1_wght400_GRAD0_opsz24.svg" alt=""> Medellin, Colombia</div>
        </div>

    </div>
    <div class="card" style="background-image: url(../Img/${array2[x+1].imagen});">
        <div class="content-card" >
             <h1>${array2[x+1].nombre}</h1>
            <p>${array2[x+1].description} </p>
            <div class="location-card"> <img src="../Img/Icons/location_on_FILL1_wght400_GRAD0_opsz24.svg" alt=""> Medellin, Colombia</div>
        </div>

    </div>
`;

        } else {
            x = array2.length - 1
            contenido.innerHTML = `
            <div class="card" style="background-image: url(../Img/${array2[x].imagen});">
        <div class="content-card" >
            <h1>${array2[x].nombre}</h1>
            <p>${array2[x].description} </p>
            <div class="location-card"> <img src="../Img/Icons/location_on_FILL1_wght400_GRAD0_opsz24.svg" alt=""> Medellin, Colombia</div>
        </div>

    </div>
    <div class="card" style="background-image: url(../Img/${array2[0].imagen});">
        <div class="content-card" >
             <h1>${array2[0].nombre}</h1>
            <p>${array2[0].description} </p>
            <div class="location-card"> <img src="../Img/Icons/location_on_FILL1_wght400_GRAD0_opsz24.svg" alt=""> Medellin, Colombia</div>
        </div>

    </div>
`
            
            
            ;
        }

        content.appendChild(contenido);
    }
}