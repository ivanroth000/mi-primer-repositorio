const productos = [
    {
        id: 1,
        nombre: 'Budín hamburgues',
        precio: 3500,
        img: "productos/torta-1.jpg",
        cantidad: 1,
    },

    {
        id: 2,
        nombre: "Lemon pie",
        precio: 3300,
        img: "productos/torta-2.jpg",
        cantidad: 1,
    },

    {
        id: 3,
        nombre: "Black-out",
        precio: 4200,
        img: "productos/torta-3.jpg",
        cantidad: 1,
    },

    {
        id: 4,
        nombre: "Selva negra",
        precio: 4200,
        img: "productos/selva-negra.jpg",
        cantidad: 1,
    },

    {
        id: 5,
        nombre: "Rogel",
        precio: 3100,
        img: "productos/torta-4.jpg",
        cantidad: 1,
    },

    {
        id: 6,
        nombre: "Brownie de chocolate",
        precio: 2200,
        img: "productos/torta-5.jpg",
        cantidad: 1,
    },

    {
        id: 7,
        nombre: "Marquise de chocolate",
        precio: 2500,
        img: "productos/torta-6.jpg",
        cantidad: 1,
    },

    {
        id: 8,
        nombre: "Tarta de coco con dulce de leche",
        precio: 2400,
        img: "productos/tarta-coco.webp",
        cantidad: 1,
    },

    {
        id: 9,
        nombre: "Torta Oreo",
        precio: 3100,
        img: "productos/torta-7.jpg",
        cantidad: 1,
    },

    {
        id: 10,
        nombre: "Cheesecake de dulce de leche", 
        precio: 2700,
        img: "productos/torta-8.jpg",
        cantidad: 1,
    },
    
    {
        id: 11,
        nombre: "Red velvet", 
        precio: 2600,
        img: "productos/torta-9.jpg",
        cantidad: 1,
    },

    {
        id: 12,
        nombre: "Torta festiva", 
        precio: 2400,
        img: "productos/torta-10.jpg",
        cantidad: 1,
    },

    {
        id: 13,
        nombre: "Brownie de chocolate", 
        precio: 2200,
        img: "productos/torta-11.jpg",
        cantidad: 1,
    },

    {
        id: 14,
        nombre: "Torta Cookie", 
        precio: 2300,
        img:"productos/torta-12.jpg",
        cantidad: 1,
    },
]

let carrito = []
let botonAgregarAlCarrito = document.querySelectorAll('.agregarAlCarrito')
let verCarrito = document.getElementById("carrito-de-compras")
let contenidoCarritoHeader = document.getElementById('contenido-carrito-header')
let cantidadCarrito = document.getElementById('cantidadCarrito')

botonAgregarAlCarrito.forEach((boton) => {
    boton.onclick = () => {
        Toastify({
            text: "Producto agregado al carrito",
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            duration: 1500,
            style: {
                background: "#8e59f1",
            },
        }).showToast();
        const productId = boton.getAttribute('id');
        const producto = productos.find(p => p.id === parseInt(productId));
        
        const repetido = carrito.some((productoRepetido)=> productoRepetido.id === producto.id)

        if(repetido){
            carrito.map((product)=>{
                if(product.id === producto.id){
                    product.cantidad++
                }
            })
        }else{

      carrito.push({
        id: producto.id,
        img: producto.img,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
      });
        }
        carritoContador()
    };
  });

const completarCarrito = () =>{

    
    contenidoCarritoHeader.innerHTML = ''
    contenidoCarritoHeader.style.display = 'block'
    const productosEnCarrito = document.createElement('div')
    productosEnCarrito.className = 'modal-header'
    productosEnCarrito.innerHTML = `<h1 class='modal-header-title'>Carrito 🛒</h1>`
    contenidoCarritoHeader.append(productosEnCarrito)

    const btnCerrarCarrito = document.createElement('h1')
    btnCerrarCarrito.innerText = `x`
    btnCerrarCarrito.className = 'modal-header-button'
    productosEnCarrito.append(btnCerrarCarrito)

    btnCerrarCarrito.onclick = ()=>{
        contenidoCarritoHeader.style.display = 'none'
    }

    carrito.forEach((producto) => {
        const carritoContenido = document.createElement('div')
        carritoContenido.className = 'modal-content'
        carritoContenido.innerHTML = `
        <img  src='${producto.img}' style='height: 150px; width: 150px;'>
        <h3 class='h3 '> ${producto.nombre}</h3>
        <p class='h4'> $${producto.precio * producto.cantidad} </p>
        <p class='h5'> Cantidad: ${producto.cantidad}</p>
        `
        contenidoCarritoHeader.append(carritoContenido)

        let btnEliminar = document.createElement('img')
        btnEliminar.src = "imagenes/basura.png"
        btnEliminar.alt = 'Botón de basura para eliminar los productos del carrito'
        btnEliminar.style.width = '40px'
        btnEliminar.style.cursor = 'pointer'
        carritoContenido.append(btnEliminar)


        btnEliminar.addEventListener('click',eliminarProducto);
    })

    const total = carrito.reduce((acumulador, p) => acumulador + p.precio * p.cantidad, 0)
    const totalCarrito = document.createElement('div')
    totalCarrito.className = 'total-content'
    totalCarrito.innerHTML = `Total a pagar: $${total}`
    contenidoCarritoHeader.append(totalCarrito)
    

}

verCarrito.addEventListener('click', function(event) {
    event.preventDefault();
    completarCarrito();
});

const eliminarProducto = () => {
   const encontrarId = carrito.find((elemento) => elemento.id)

   carrito = carrito.filter((carritoId) => {
    return carritoId !== encontrarId;
   })

   carritoContador()
   completarCarrito()
}

const carritoContador = () =>{
    cantidadCarrito.style.display = 'block'
    cantidadCarrito.innerText = carrito.length
}