/*
Categorias:
    1 - Alarmas autos
    2 - Alarmas casas
    3 - Camaras
    4 - Candados
    5 - Puertas
*/
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
//----------------------------------------------------------
let categorias = [{ 
                    idCategoria: 1,
                    nombreCategoria: 'Alarmas para casa',
                    idHTML: 'alarmaCasa'          
                  }, 
                  { 
                    idCategoria: 2,
                    nombreCategoria: 'Alarmas para auto',
                    idHTML: 'alarmaAuto'          
                  }, 
                  { 
                    idCategoria: 3,
                    nombreCategoria: 'Camaras de seguridad',
                    idHTML: 'camaras'          
                  }, 
                  { 
                    idCategoria: 4,
                    nombreCategoria: 'Accesorios para Puertas',
                    idHTML: 'puertas'          
                  }, 
                  { 
                    idCategoria: 5,
                    nombreCategoria: 'Candados',
                    idHTML: 'candados'          
                  }, ]
let productosList = [];

const validarCompra = (e) => {
  e.preventDefault()
  document.getElementById('cerrarCompra').click()
  Swal.fire('Haz realizado la compra con exito','','success')
}

const cantidadEstrellas = (cant) => {
  let estrellas = ''
      for (let i = 0 ; i < 5 ; i++){
          cant--
          if(cant >= 0)
              estrellas = estrellas + '<i class="fa-solid fa-star fa-lg"></i>'
          else 
              estrellas = estrellas + '<i class="fa-regular fa-star fa-lg"></i>'
          
      }
  return estrellas    
}

const detallesCompra = (imagen, producto, precio, envioGratis, cantEstrellas) => {
  document.getElementById('nombre').value = ''
  document.getElementById('domicilioBarrio').value = ''
  document.getElementById('domicilioCPostal').value = ''

  let estrellas = cantidadEstrellas (parseInt(cantEstrellas))
  let envio = envioGratis ? envioGratis : "Envío: $ 1.499"
  document.getElementById('productoCompra').innerHTML =     '<div class="row imgProd">' +
  '<div class="col-md-4">' +
    '<img width="160" height="160" src="'+ imagen +'"' +
      'class="img-fluid img-thumbnail imgBorde" alt="...">' +
  '</div>' +
  '<div class="col-md-8">' +
    '<div class="row">' +
      '<div class="col-md-12">' +
        '<p class="text-start tituloItem">' + producto + '</p>' +
      '</div>' +
      '<div class="col-md-12">' +
        '<h3 class="text-start precioItem">' + precio + '</h3>' +
      '</div>' +
      '<div class="col-md-12">' +
        '<p class="text-start envioGratis">' + envio + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="row">' +
      '<div class="col-md-8"></div>' +
      '<div class="col-md-4">' + estrellas +
      '</div>' +
    '</div>' +
  '</div>' +
'</div>'
}


const listarProductos = (imagen, producto, precio, envioGratis, estrellas, cantEstrellas) => {
  let html = '<a href="#view" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="detallesCompra('+"'"+imagen+"',"+"'"+producto+"',"+"'"+precio+"',"+"'"+envioGratis+"',"+"'"+cantEstrellas+"'"+')" class="list-group-item list-group-item-action itemsProd" aria-current="true">' +
  '<div class="row imgProd">' +
    '<div class="col-md-4">' +
      '<img width="160" height="160" src="'+ imagen +'"' +
        'class="img-fluid img-thumbnail imgBorde" alt="...">' +
    '</div>' +
    '<div class="col-md-8">' +
      '<div class="row">' +
        '<div class="col-md-12">' +
          '<p class="text-start tituloItem">' + producto + '</p>' +
        '</div>' +
        '<div class="col-md-12">' +
          '<h3 class="text-start precioItem">' + precio + '</h3>' +
        '</div>' +
        '<div class="col-md-12">' +
          '<p class="text-start envioGratis">' + envioGratis + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="row">' +
        '<div class="col-md-8"></div>' +
        '<div class="col-md-4">' + estrellas +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</a>'
  return html 
}



const filtro = (cat) => {
  const res = productosList.filter(producto => producto.categoria === cat)
  let htmlProd = ''
  res.forEach(prod =>{
    let envioGratis = prod.envioGratis ? 'Envio gratis' : ''
    let estrellas = cantidadEstrellas(prod.puntuacion)
    
    htmlProd = htmlProd + listarProductos(prod.imagen, prod.producto, prod.precio, envioGratis, estrellas, prod.puntuacion)
    
  })
  if(res.length < 1){
    htmlProd = '<div class="row"><div class="col-md-6 sinResultados"><br><img src="./Imagenes/question-solid.svg" class="img_cartel"><br><h3 class="sinResultados">Sin resultados para esta categoría.</h3><br></div></div>'
  }
  document.getElementById("listaDeProductos").innerHTML = htmlProd

}

const contador = (cat) => {
    const res = productosList.filter(producto => producto.categoria === cat)
    return res.length;
}

const innerCantidades = (id, nombre, categoria) => {
  document.getElementById(id).innerHTML = '<a href="#productos" onclick="filtro(' + categoria + ')">' + nombre + '</a> ' +
  '<span class="badge rounded-pill" style="background-color: #023E73;">'+ contador(categoria) +'</span>'
}

const cargarCantidades = () => {
  categorias.forEach(cate => {
    innerCantidades(cate.idHTML, cate.nombreCategoria, cate.idCategoria);
  })
}

const mostrarProductos = async () => {
  const resp = await fetch("./productos/productos.json");
  const productos = await resp.json();
  for (let producto of productos) {
    productosList.push(producto);
  }

  cargarCantidades();

  let htmlProd = document.getElementById("listaDeProductos").innerHTML
  productosList.forEach(prod => {
    let envioGratis = prod.envioGratis ? 'Envio gratis' : ''
    let estrellas = cantidadEstrellas(prod.puntuacion)
    htmlProd = htmlProd + listarProductos(prod.imagen, prod.producto, prod.precio, envioGratis, estrellas)
    
  })
  document.getElementById("listaDeProductos").innerHTML = htmlProd
};



function mostrar_metodoPago(){
    var contenido1=document.getElementById('contenedor_tarjeta').style.display="none";
    var contenido2=document.getElementById('contenedor_efectivo').style.display="none";
    const metodos=document.querySelector('#metodo_pago');
    console.log(metodos);
    metodos.addEventListener('change',()=> {
      var opcion_valor=metodos.value;
      
      var opcion_seleccionada=metodos.options[metodos.selectedIndex];

      if(opcion_seleccionada.value=="1"){
        contenido1=document.getElementById('contenedor_tarjeta').style.display="block";
        contenido2=document.getElementById('contenedor_efectivo').style.display="none";
      }else if(opcion_seleccionada.value=="2"){
        contenido2=document.getElementById('contenedor_efectivo').style.display="block";
        contenido1=document.getElementById('contenedor_tarjeta').style.display="none";
      }else{
        contenido1=document.getElementById('contenedor_tarjeta').style.display="none";
        contenido2=document.getElementById('contenedor_efectivo').style.display="none";
      }

    })
    
}

function selector_imagen(){
    
    const imagenes=document.querySelectorAll('.imagenes_select');

    imagenes.forEach(img => {
        img.addEventListener('click',function() {
            var activo=document.querySelector('.imagen_seleccionada');
            activo.classList.remove('imagen_seleccionada');
            this.classList.add('imagen_seleccionada');
        })
    });
}

window.addEventListener('load' ,selector_imagen);
window.addEventListener('load' ,mostrar_metodoPago);