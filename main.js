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

/*Hice un array de productos y agarre un btn para que cuando le haga click se aparezca un
alert de toastify de 'producto agregado' y que el producto apartir del ID se mande
al carrito
*/

let carrito = JSON.parse(localStorage.getItem('carrito')) || []
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
        guardarLocal()
    };
  });

  //Aca hacemos el carrito
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


    //Acá hacemos los productos que van al carrito
    carrito.forEach((producto) => {
        const carritoContenido = document.createElement('div')
        carritoContenido.className = 'modal-content'
        carritoContenido.innerHTML = `
        <img  src='${producto.img}' style='height: 150px; width: 150px;'>
        <h3 class='h3 '> ${producto.nombre}</h3>
        <p class='h4'> $${producto.precio * producto.cantidad} </p>
        <span class='restar'> - </span>
        <p class='h5'> Cantidad: ${producto.cantidad}</p>
        <span class='sumar'> + </span>
        `
        contenidoCarritoHeader.append(carritoContenido)

        let restar = carritoContenido.querySelector('.restar')
        restar.addEventListener('click', () => {
            if(producto.cantidad != 1){
            producto.cantidad--
            }
            guardarLocal()
            completarCarrito()
        })

        let sumar = carritoContenido.querySelector('.sumar')
        sumar.addEventListener('click', () => {
            
            producto.cantidad++
            guardarLocal()
            completarCarrito()
        })

        let btnEliminar = document.createElement('img')
        btnEliminar.src = "imagenes/basura.png"
        btnEliminar.alt = 'Botón de basura para eliminar los productos del carrito'
        btnEliminar.style.width = '30px'
        btnEliminar.style.cursor = 'pointer'
        btnEliminar.setAttribute('data-product-id', producto.id);
        carritoContenido.append(btnEliminar)


        btnEliminar.addEventListener('click',eliminarProducto);
    })
    //Este es el contador de - y + para sumar productos desde el carrito
    const total = carrito.reduce((acumulador, p) => acumulador + p.precio * p.cantidad, 0)
    const totalCarrito = document.createElement('div')
    const btnPagar = document.createElement('button')
    btnPagar.className = 'total-content btn-pagar'
    btnPagar.innerText = 'Finalizar compra'
    totalCarrito.className = 'total-content'
    totalCarrito.innerHTML = `Total a pagar: $${total}`
    contenidoCarritoHeader.append(totalCarrito)
    contenidoCarritoHeader.append(btnPagar)

    

}

verCarrito.addEventListener('click', function(event) {
    event.preventDefault();
    completarCarrito();
});

//Filtra el producto desde el ID
const eliminarProducto = (event) => {
    const productoId = parseInt(event.target.dataset.productId);
   

   carrito = carrito.filter((producto) => {
    return producto.id !== productoId;
 });

   carritoContador()
   guardarLocal()
   completarCarrito()
}

//Guardamos los productos en el LocalStorage
const carritoContador = () =>{
    cantidadCarrito.style.display = 'block'
    const carritoLength = carrito.length
    localStorage.setItem('carritoLength', JSON.stringify(carritoLength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem('carritoLength'))
}
carritoContador()

const guardarLocal = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

//En el apartado de 'cómo comprar' agregué una sección de comentarios simulando una API
//desde la pag de jsonplaceholder

let seccionComentarios = document.querySelector('.seccion-comentarios');

async function obtenerComentarios() {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/comments');
        const data = await respuesta.json();

        // Itera solo los primeros 5 comentarios
        for (i = 0; i < 5; i++) {
            const post = data[i];
            let contenedor = document.createElement('div');
            contenedor.innerHTML = `
            <h3 class='text-center'>${post.name}</h3>
            <p class='text-center'>${post.body}</p>
            `;
            contenedor.className = 'card card-body my-3 col-sm-12 col-md-6 col-lg-6 comentario-card';
            seccionComentarios.append(contenedor);
        }
    } catch (error) {
        console.error('Error al obtener los comentarios:', error);
    }
}

obtenerComentarios();

//Al formulario en el apartado de 'contacto' lo validamos y una vez completado
//se visualiza un alert de SweetAlert de 'Mensaje enviado'

let formularioContacto = document.querySelector('.formulario-contacto')
let btnEnviar = document.querySelector('.btn-enviar')
let btnCancelar = document.querySelector('.btn-cancelar')
let emailFormulario = document.querySelector('.email-form')
let comentarioFormulario = document.querySelector('.comentario-form')

btnEnviar.onclick = (e) => {
    e.preventDefault()
    let esValido = true;

    emailFormulario.classList.remove('error');
    comentarioFormulario.classList.remove('error');

    document.getElementById('msjErrorEmail').innerHTML = '';
    document.getElementById('msjErrorComentario').innerHTML = '';
    
    if(emailFormulario.value === ''){
        esValido = false;
        emailFormulario.classList.add('error');
        let msjErrorEmail = document.getElementById('msjErrorEmail')
        msjErrorEmail.innerHTML = '<h5> El campo no puede estar vacío </h5>'

    }

    if(comentarioFormulario.value === ''){
        esValido = false;
        comentarioFormulario.classList.add('error');
        let msjErrorComentario = document.getElementById('msjErrorComentario')
        msjErrorComentario.innerHTML = '<h5> El campo no puede estar vacío </h5>'

    }

    if(esValido){
        swal({
            title: "¡Mensaje enviado!",
            text: "Gracias por comunicarte con nosotros",
            icon: "success",
            backdrop: "#8163b9",
            buttons: {
                confirm: {
                  text: "ok",
                  className: "btn-alert-form",
                },
            }
            
        });
        limpiarForm()
    }
}


function limpiarForm (){
    emailFormulario.value = '';
    comentarioFormulario.value = '';
    emailFormulario.classList.remove('error');
    comentarioFormulario.classList.remove('error');
    document.getElementById('msjErrorEmail').innerHTML = '';
    document.getElementById('msjErrorComentario').innerHTML = '';
}

btnCancelar.onclick = (e) => {
    e.preventDefault()
    limpiarForm()
}


