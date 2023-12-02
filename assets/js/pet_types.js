function cargarPetTypes() {
    fetch(backendPathGeneric + "/pet_type")
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.pet_types)) {
                const tipoMascotaSelect = document.getElementById("tipoMascota");

                tipoMascotaSelect.innerHTML = '';
                const option = document.createElement("option");
                option.value = 0; 
                option.text = "Seleccione"; 
                tipoMascotaSelect.appendChild(option);

                data.pet_types.forEach(tipo => {
                    const option = document.createElement("option");
                    option.value = tipo.id; 
                    option.text = tipo.name; 
                    tipoMascotaSelect.appendChild(option);
                });
            } else {
                console.error("La respuesta del backend no contiene un array 'pet_types':", data);
            }
        })
        .catch(error => console.error("Error al obtener tipos de mascotas:", error));
}

document.addEventListener("DOMContentLoaded", function () {
    cargarPetTypes();
});
