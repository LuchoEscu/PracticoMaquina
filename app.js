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
        } else {
          document.getElementById('cerrarCompra').click()
          if( document.getElementById("metodo_pago").value == 2){
            Swal.fire('El producto sera enviado una vez recibamos el pago.', 'Entregue el siguiente codigo en la sucursal seleccionada para pagar ' + Math.floor(Math.random() * (99999999999 - 10000000000 + 1) + 10000000000), 'success')
          } else {
            Swal.fire('Haz realizado la compra con exito', 'Su código de seguimiento es ' + Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000), 'success')
          }
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
},]
let productosList = [];
var myModalEl = document.getElementById('exampleModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  closeModal()
})
const closeModal = () => {
  document.getElementById('formCompra').classList.remove('was-validated');
  document.getElementById('formCompra').reset();
  document.getElementById('contenedor_tarjeta').style.display = 'none';
  document.getElementById('contenedor_efectivo').style.display = 'none';

}

const validarCompra = (e) => {
  e.preventDefault()
}

const cantidadEstrellas = (cant) => {
  let estrellas = ''
  for (let i = 0; i < 5; i++) {
    cant--
    if (cant >= 0)
      estrellas = estrellas + '<i class="fa-solid fa-star fa-lg"></i>'
    else
      estrellas = estrellas + '<i class="fa-regular fa-star fa-lg"></i>'

  }
  return estrellas
}

const salvarValidaciones = () => {
  let valor = document.getElementById("metodo_pago").value
  if (valor.toString() == "2") {
    document.getElementById("numero_tarjeta").removeAttribute("required")
    document.getElementById("tipo_tarjeta").removeAttribute("required")
    document.getElementById("Codigotarjeta").removeAttribute("required")
    document.getElementById("validationCustom04").removeAttribute("required")
    document.getElementById("validationCustom06").removeAttribute("required")
  }
}

const detallesCompra = (imagen, producto, precio, envioGratis, cantEstrellas) => {
  document.getElementById('nombre').value = ''
  document.getElementById('domicilioBarrio').value = ''
  document.getElementById('domicilioCPostal').value = ''

  let estrellas = cantidadEstrellas(parseInt(cantEstrellas))
  let envio = envioGratis ? envioGratis : "Envío: $ 1.499"
  let classEnvio = envioGratis ? 'envioGratis' : ''
  document.getElementById('productoCompra').innerHTML = '<div class="row imgProd">' +
    '<div class="col-md-4">' +
    '<img width="120" height="120" src="' + imagen + '"' +
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
    '<p class="text-start '+classEnvio+'">' + envio + '</p>' +
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
  let html = '<a href="#view" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="detallesCompra(' + "'" + imagen + "'," + "'" + producto + "'," + "'" + precio + "'," + "'" + envioGratis + "'," + "'" + cantEstrellas + "'" + ')" class="list-group-item list-group-item-action itemsProd" aria-current="true">' +
    '<div class="row imgProd">' +
    '<div class="col-md-4">' +
    '<img width="120" height="120" src="' + imagen + '"' +
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
  document.getElementById("resetarFiltro").style.display = "block"
  const res = productosList.filter(producto => producto.categoria === cat)
  let htmlProd = ''
  res.forEach(prod => {
    let envioGratis = prod.envioGratis ? 'Envio gratis' : ''
    let estrellas = cantidadEstrellas(prod.puntuacion)

    htmlProd = htmlProd + listarProductos(prod.imagen, prod.producto, prod.precio, envioGratis, estrellas, prod.puntuacion)

  })
  if (res.length < 1) {
    htmlProd = '<div class="row"><div class="col-md-6 sinResultados"><br><img src="./Imagenes/question-solid.svg" class="img_cartel"><br><h3 class="sinResultados">Sin resultados para esta categoría.</h3><br></div></div>'
  }
  document.getElementById("listaDeProductos").innerHTML = htmlProd

}

const resetearFiltros = () => {
  document.getElementById("resetarFiltro").style.display = "none"
  
  let htmlProd = ""
  productosList.forEach(prod => {
    let envioGratis = prod.envioGratis ? 'Envio gratis' : ''
    let estrellas = cantidadEstrellas(prod.puntuacion)
    htmlProd = htmlProd + listarProductos(prod.imagen, prod.producto, prod.precio, envioGratis, estrellas, prod.puntuacion)

  })
  document.getElementById("listaDeProductos").innerHTML = htmlProd

}

const contador = (cat) => {
  const res = productosList.filter(producto => producto.categoria === cat)
  return res.length;
}

const innerCantidades = (id, nombre, categoria) => {
  document.getElementById(id).innerHTML = '<a href="#productos" onclick="filtro(' + categoria + ')">' + nombre + '</a> ' +
    '<span class="badge rounded-pill" style="background-color: #023E73;">' + contador(categoria) + '</span>'
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
    htmlProd = htmlProd + listarProductos(prod.imagen, prod.producto, prod.precio, envioGratis, estrellas, prod.puntuacion)

  })
  document.getElementById("listaDeProductos").innerHTML = htmlProd
};



function mostrar_metodoPago() {
  var contenido1 = document.getElementById('contenedor_tarjeta').style.display = "none";
  var contenido2 = document.getElementById('contenedor_efectivo').style.display = "none";
  const metodos = document.querySelector('#metodo_pago');
  console.log(metodos);
  metodos.addEventListener('change', () => {
    var opcion_valor = metodos.value;

    var opcion_seleccionada = metodos.options[metodos.selectedIndex];

    if (opcion_seleccionada.value == "1") {
      contenido1 = document.getElementById('contenedor_tarjeta').style.display = "block";
      contenido2 = document.getElementById('contenedor_efectivo').style.display = "none";
    } else if (opcion_seleccionada.value == "2") {
      contenido2 = document.getElementById('contenedor_efectivo').style.display = "block";
      contenido1 = document.getElementById('contenedor_tarjeta').style.display = "none";
    } else {
      contenido1 = document.getElementById('contenedor_tarjeta').style.display = "none";
      contenido2 = document.getElementById('contenedor_efectivo').style.display = "none";
    }

  })

}

function selector_imagen() {

  const imagenes = document.querySelectorAll('.imagenes_select');

  imagenes.forEach(img => {
    img.addEventListener('click', function () {
      var activo = document.querySelector('.imagen_seleccionada');
      activo.classList.remove('imagen_seleccionada');
      this.classList.add('imagen_seleccionada');
    })
  });
}

function validar_nombre_teclas(event) {

  var valor_name=document.getElementById('nombreContacto');
  var expresion="^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";
  var valido=document.getElementById('dato-valido');
  var invalido=document.getElementById('dato-invalido');

  valor_name.addEventListener('keydown',function() {

      if(valor_name.value==""){
        invalido.style.display="block";
        invalido.innerHTML="Ingrese su nombre, por favor.";
        valido.style.display="none";
        valor_name.classList.add('invalido');
        valor_name.classList.remove('valido');
        event.preventDefault();
      }else if (valor_name.value.match(expresion)) {
        invalido.style.display="none";
        valido.style.display="block";
        valor_name.classList.remove('invalido');
        valor_name.classList.add('valido');
      } else {
        valido.style.display="none";
        invalido.style.display="block";
        invalido.innerHTML="Su nombre no es valido."
        valor_name.classList.remove('valido');
        valor_name.classList.add('invalido');
        event.preventDefault();
      }

  });
}

function validarCorreo() {
  var valor_correo=document.getElementById('emailContacto');
  var invalido=document.getElementById('correo-invalido');
  var valido=document.getElementById('correo-valido');
  var expresion3=/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  valor_correo.addEventListener('keydown',function () {
      if(valor_correo.value==""){
        valor_correo.classList.add('invalido');
        valor_correo.classList.remove('valido');
        invalido.style.display="block";
        valido.style.display="none";
      }else if(valor_correo.value.match(expresion3)){
        valor_correo.classList.add('valido');
        valor_correo.classList.remove('invalido');
        invalido.style.display="none";
        valido.style.display="block";
      }else{
        valor_correo.classList.add('invalido');
        valor_correo.classList.remove('valido');
        invalido.style.display="block";
        valido.style.display="none";
        invalido.innerHTML="Su correo ingresado, se encuentra Invalido."
      }
  })
}

function validarTelefono() {
  var numero=document.getElementById('telefono');
  var invalido1=document.getElementById('numero-invalido');
  var valido1=document.getElementById('numero-valido');  

  numero.addEventListener('keydown',function () {
    
    if(numero.value==""){
      numero.classList.add('invalido');
      numero.classList.remove('valido');
      invalido1.style.display="block";
      valido1.style.display="none";
    }else{
      numero.classList.add('valido');
      numero.classList.remove('invalido');
      invalido1.style.display="none";
      valido1.style.display="block";
    }
  })

}

window.addEventListener('load' ,validarTelefono);
window.addEventListener('load' ,validarCorreo);
window.addEventListener('load' ,validar_nombre_teclas);
window.addEventListener('load', selector_imagen);
window.addEventListener('load', mostrar_metodoPago);