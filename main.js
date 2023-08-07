const productos = [
    {
        id: 1,
        nombre: 'Budín hamburgues',
        precio: 3500,
        img: "productos/torta-1.jpg",
    },

    {
        id: 2,
        nombre: "Lemon pie",
        precio: 3300,
        img: "productos/torta-2.jpg",
    },

    {
        id: 3,
        nombre: "Black-out",
        precio: 4200,
        img: "productos/torta-3.jpg",
    },

    {
        id: 4,
        nombre: "Selva negra",
        precio: 4200,
        img: "productos/selva-negra.jpg",
    },

    {
        id: 5,
        nombre: "Rogel",
        precio: 3100,
        img: "productos/torta-4.jpg",
    },

    {
        id: 6,
        nombre: "Brownie de chocolate",
        precio: 2200,
        img: "productos/torta-5.jpg",
    },

    {
        id: 7,
        nombre: "Marquise de chocolate",
        precio: 2500,
        img: "productos/torta-6.jpg",
    },

    {
        id: 8,
        nombre: "Tarta de coco con dulce de leche",
        precio: 2400,
        img: "productos/tarta-coco.webp",
    },

    {
        id: 9,
        nombre: "Torta Oreo",
        precio: 3100,
        img: "productos/torta-7.jpg",
    },

    {
        id: 10,
        nombre: "Cheesecake de dulce de leche", 
        precio: 2700,
        img: "productos/torta-8.jpg",
    },
    
    {
        id: 11,
        nombre: "Red velvet", 
        precio: 2600,
        img: "productos/torta-9.jpg"
    },

    {
        id: 12,
        nombre: "Torta festiva", 
        precio: 2400,
        img: "productos/torta-10.jpg",
    },

    {
        id: 13,
        nombre: "Brownie de chocolate", 
        precio: 2200,
        img: "productos/torta-11.jpg",
    },

    {
        id: 14,
        nombre: "Torta Cookie", 
        precio: 2300,
        img:"productos/torta-12.jpg",
    },
]

let carrito = []
let botonAgregarAlCarrito = document.querySelectorAll('.agregarAlCarrito')
let verCarrito = document.getElementById("carrito-de-compras")
let contenidoCarritoHeader = document.getElementById('contenido-carrito-header')

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
      carrito.push({
        id: producto.id,
        img: producto.img,
        nombre: producto.nombre,
        precio: producto.precio,
      });
      console.log(carrito);
    };
  });

verCarrito.onclick = (e) =>{
    e.preventDefault()
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
        <p class='h4'> $${producto.precio} </p>
        `
        contenidoCarritoHeader.append(carritoContenido)
    })

    const total = carrito.reduce((acumulador, p) => acumulador + p.precio, 0)
    const totalCarrito = document.createElement('div')
    totalCarrito.className = 'total-content'
    totalCarrito.innerHTML = `Total a pagar: $${total}`
    contenidoCarritoHeader.append(totalCarrito)
    

}


