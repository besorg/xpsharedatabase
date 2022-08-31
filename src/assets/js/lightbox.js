/*
const imagenes = document.body.querySelectorAll('.img-galeria')
const imagenesLight = document.body.querySelector('.agregar-imagen')
const contenedorLight = document.body.querySelector('.imagen-light')

const hamburguer1 = document.body.querySelector('.hamburguesa');
*/

/*
imagenes.forEach(imagen =>{
    imagen.addEventListener('click', ()=>{
        aparecerImagen(imagen.getAttribute('src'));
    })

})

contenedorLight.addEventListener('click', (e)=>{
    if(e.target!=imagenesLight){
        contenedorLight.classList.toggle('show')
        imagenesLight.classList.toggle('showImage')
        hamburguer1.style.opacity = '1'
    }
})

*/

const aparecerImagen = (imagen) =>{
    document.body.querySelector('.agregar-imagen').src = imagen;
    document.body.querySelector('.imagen-light').classList.toggle('show');
    document.body.querySelector('.hamburguesa').style.opacity = '0';
}

function ocultarImagen(){
    document.body.querySelector('.imagen-light').classList.toggle('show');
    document.body.querySelector('.hamburguesa').style.opacity = '1';
}
