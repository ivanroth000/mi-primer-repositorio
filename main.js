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
]

let carrito = []

let botonAgregarAlCarrito = document.querySelectorAll('.agregarAlCarrito')

botonAgregarAlCarrito.forEach(boton => {
    boton.onclick = () => {
      alert('Producto agregado al carrito');
    };
  });