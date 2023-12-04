//Validación del formulario para la confirmación de la compra

let formularioConfirmacionDeCompra = document.querySelector('.form-pagar')
let validacionFormCompra = document.querySelectorAll('.form-control')
let formDepto = document.querySelector('.form-depto')

formularioConfirmacionDeCompra.addEventListener('submit', (e) => {
    e.preventDefault()
    let esValido = true;

    validacionFormCompra.forEach((elemento) => {
        let msjErrorCompra = elemento.nextElementSibling;
        if (msjErrorCompra && msjErrorCompra.classList.contains('msj-error-compra')) {
            elemento.classList.remove('error');
            msjErrorCompra.innerHTML = '';
            if(elemento.value.trim() === ''){
                esValido = false;
                elemento.classList.add('error');
                msjErrorCompra.innerHTML = '<h5> El campo no puede estar vacío </h5>'
            }
        }
    });
    if(formDepto.value === ''){
        formDepto.classList.remove('error')
    }

    //valida que solo se acepten números en el input código de seguridad
    let codigoSeguridad = document.getElementById('codigo-de-seguridad');
    let msjErrorSeguridad = document.querySelector('.msj-error-seguridad');
    if (codigoSeguridad.value.trim() === '') {
        esValido = false;
        msjErrorSeguridad.innerHTML = '<h5>El campo no puede estar vacío</h5>';
        codigoSeguridad.classList.add('error');
    } else if (!/^\d+$/.test(codigoSeguridad.value)) {
        esValido = false;
        msjErrorSeguridad.innerHTML = '<h5>Debe ingresar solo números</h5>';
        codigoSeguridad.classList.add('error');
    } else {
        msjErrorSeguridad.innerHTML = '';
        codigoSeguridad.classList.remove('error');
    }
    
    let terminosCheck = document.getElementById('terminos-check');
    let msjCheck = document.querySelector('.msj-error-check');

    if (!terminosCheck.checked) {
        esValido = false;
        terminosCheck.classList.add('error');
        msjCheck.innerHTML = '<h5> Debes aceptar los términos y condiciones </h5>';
    } else {
    terminosCheck.classList.remove('error');
    msjCheck.innerHTML = '';
    }

    if(esValido){
        swal({
            title: "¡Compra realizada con éxito!",
            text: "Gracias por confiar en nosotros",
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

    function limpiarForm (){
        let inputsCompra = document.querySelectorAll('input')
        inputsCompra.forEach((input) => {
            input.value = '';
            input.classList.remove('error');
        });
        terminosCheck.checked = false
    }
    

});
