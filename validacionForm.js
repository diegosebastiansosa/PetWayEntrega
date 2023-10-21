function validarEnviar() {
    // Validar el campo de nombre
    if (document.formulario.nombre.value.length <= 3) {
        alert("Tiene que escribir su nombre");
        document.formulario.nombre.focus();
        return;
    }

    // Validar el campo de apellido
    if (document.formulario.apellido.value.length <= 3) {
        alert("Tiene que escribir su apellido");
        document.formulario.nombre.focus();
        return;
    }

    // Validar el campo de mail
    let mail = document.formulario.mail.value;
    // mail = validarMail(mail);

    re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if(!re.exec(mail)){
        alert("Ingrese un email válido");
        document.formulario.mail.focus();
        return;
    }
    
    // Validar la edad. Debe ser un entero mayor que 1.
    let edad = document.formulario.edad.value;

    edad = validarEntero(edad);
    document.formulario.edad.value = edad;

    if (edad == "") {
        alert("Tiene que introducir un número entero en su edad.");
        document.formulario.edad.focus();
        return;
    } else {
        if (edad < 1) {
            alert("Debe introducir una edad válida.");
            document.formulario.edad.focus();
            return;
        }
    }

    // Verificamos si al menos uno de los radios está marcado
    if (
        formulario.pet[0].checked == false &&
        formulario.pet[1].checked == false &&
        formulario.pet[2].checked == false
    ) {
        // Mostramos una alerta al usuario
        alert("Selecciona un tipo de mascota");
        document.formulario.pet.focus();

    }

    // Validar el campo de nombre de mascto
    if (document.formulario.nombreMascota.value.length <= 2) {
        alert("Tiene que escribir el nombre de su mascota");
        document.formulario.nombreMascota.focus();
        return;
    }

    // Validar el campo de nombre
    if (document.formulario.consulta.value.length <= 0) {
        alert("Escriba su consulta");
        document.formulario.consulta.focus();
        return;
    }

    // Si todas las validaciones pasan, se envía el formulario.
    alert("Muchas gracias por enviar el formulario");
    document.formulario.submit();
}

function validarEntero(valor) {
    // Intentar convertir a entero.
    // Si era un entero no le afecta, si no lo era, lo intenta convertir.
    valor = parseInt(valor);

    // Comprobar si es un valor numérico
    if (isNaN(valor)) {
        // En caso de no ser un número, devuelve una cadena vacía
        return "";
    } else {
        // En caso de ser un número, devuelve el valor
        return valor;
    }
}

/*
// función para comprar que el mail ingresado sea correcto
function validarMail (valor){
    re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if(!re.exec(valor)){
        alert("Ingrese un email válido");
        document.formulario.mail.focus();
        return;
    }
}
*/