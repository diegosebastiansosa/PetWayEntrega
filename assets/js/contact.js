const backendPath = 'http://localhost:5001';

function SendQuestion(){
    document.getElementById('form-response').textContent = '';
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let mail = document.getElementById("mail").value;
    let edad = document.getElementById("edad").value;
    let tipo = document.querySelector('input[name="pet"]:checked').value;
    let nom_mascota = document.getElementById("nombreMascota").value;
    let consulta = document.getElementById("consulta").value;

    limpiar_errores();

    if(validar(nombre, 'nombre-error') && validar(apellido, 'apellido-error') && validar(mail, 'mail-error')
        && validar(edad, 'edad-error') && validar(tipo, 'tipo-error') && validar(nom_mascota, 'mascota-error')
        && validar(consulta, 'consulta-error') && validarEmail(mail, 'mail-error') 
        && validarEntero(edad, 'edad-error')
    ){

        let data = {
            name: nombre,
            last_name: apellido,
            email: mail,
            age: edad,
            pet_type_id: tipo,
            pet_name: nom_mascota,
            question: consulta
        };
        console.log("Nombre: " + nombre + " Apellido: " + apellido + " Mail: " + mail + " Edad: " + edad + " Tipo: " + tipo + " Nombre Mascota: " + nom_mascota + " Consulta: " + consulta);

        fetch(backendPath + '/question/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            document.getElementById('form-response').textContent = 'Su consulta ha sido enviada';
            console.log(result);
            limpiar_errores();
            limpiar_campos();
        })
        .catch(error => {
            console.error('Error al enviar la consulta:', error);
            document.getElementById('form-response').textContent = 'Hubo un error al enviar la consulta';
            limpiar_errores();
        });
    }
}

function limpiar_errores() {
    document.getElementById("nombre-error").textContent = '';
    document.getElementById("apellido-error").textContent = '';
    document.getElementById("mail-error").textContent = '';
    document.getElementById("edad-error").textContent = '';
    document.getElementById("tipo-error").textContent = '';
    document.getElementById("mascota-error").textContent = '';
    document.getElementById("consulta-error").textContent = '';
}


function limpiar_campos() {
    document.getElementById("nombre").value = '';
    document.getElementById("apellido").value = '';
    document.getElementById("mail").value = '';
    document.getElementById("edad").value = '';
    document.querySelector('input[name="pet"]:checked').value = '';
    document.getElementById("nombreMascota").value = '';
    document.getElementById("consulta").value = '';
    document.getElementById("nombre").focus();
}


function validarEmail(valor, campo) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(valor)) {
        document.getElementById(campo).textContent = '';
        return true;
    } else {
        document.getElementById(campo).textContent = 'El email no es válido.';
        return false;
    }
}

function validar(valor, campo) {
    if (valor.trim() === '') {
        document.getElementById(campo).textContent = 'Debe completar correctamente el campo.';
        return false;
    } else {
        document.getElementById(campo).textContent = '';
        return true;
    }
}

function validarEntero(valor, campo) {
    valor = parseInt(valor);
    if (isNaN(valor)) {
        document.getElementById(campo).textContent = 'El valor debe ser numerico.';
        return false;
    } else {
        document.getElementById(campo).textContent = '';
        return true;
    }
}