/*
Categorias:
    1 - Alarmas autos
    2 - Alarmas casas
    3 - Camaras
    4 - Otros
*/
let productosList = [];

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

const filtro = (cat) => {
    const res = productosList.filter(producto => producto.categoria === cat)
    console.log(res);
}

const mostrarProductos = async () => {
  const resp = await fetch("./productos/productos.json");
  const productos = await resp.json();
  for (let producto of productos) {
    productosList.push(producto);
  }
  let htmlProd = document.getElementById("listaDeProductos").innerHTML
  productosList.forEach(prod => {
    let envioGratis = prod.envioGratis ? 'Envio gratis' : ''
    let estrellas = cantidadEstrellas(prod.puntuacion)
    
    htmlProd = htmlProd +
    '<a href="#" class="list-group-item list-group-item-action itemsProd" aria-current="true">' +
    '<div class="row imgProd">' +
      '<div class="col-md-4">' +
        '<img width="160" height="160" src="'+ prod.imagen +'"' +
          'class="img-fluid img-thumbnail imgBorde" alt="...">' +
      '</div>' +
      '<div class="col-md-8">' +
        '<div class="row">' +
          '<div class="col-md-12">' +
            '<p class="text-start tituloItem">' + prod.producto + '</p>' +
          '</div>' +
          '<div class="col-md-12">' +
            '<h3 class="text-start precioItem">' + prod.precio + '</h3>' +
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
  })
  document.getElementById("listaDeProductos").innerHTML = htmlProd
};