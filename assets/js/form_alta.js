const backendPath2 = 'http://localhost:5001';

function SendProduct(){
    /*document.getElementById('form-response').textContent = '';
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let mail = document.getElementById("mail").value;
    let edad = document.getElementById("edad").value;
    let tipo = document.querySelector('input[name="pet"]:checked').value;
    let nom_mascota = document.getElementById("nombreMascota").value;
    let consulta = document.getElementById("consulta").value;
*/
    //limpiar_errores();

    /* if(validar(nombre, 'nombre-error') && validar(apellido, 'apellido-error') && validar(mail, 'mail-error')
        && validar(edad, 'edad-error') && validar(tipo, 'tipo-error') && validar(nom_mascota, 'mascota-error')
        && validar(consulta, 'consulta-error') && validarEmail(mail, 'mail-error') 
        && validarEntero(edad, 'edad-error')
    ){ */

        let data = {
            name: "prueba 5",
            description: "esto es una prueba 5",
            quantity: "5",
            price: "50",
            unit_id: "5",
            photo_name: "prueba5.png"
        };
        //console.log("Nombre: " + nombre + " Apellido: " + apellido + " Mail: " + mail + " Edad: " + edad + " Tipo: " + tipo + " Nombre Mascota: " + nom_mascota + " Consulta: " + consulta);

        fetch(backendPath2 + '/product', {
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
            //limpiar_errores();
            //limpiar_campos();
        })
        .catch(error => {
            console.error('Error al enviar la consulta:', error);
            document.getElementById('form-response').textContent = 'Hubo un error al enviar la consulta';
            //limpiar_errores();
        });
    }
//}