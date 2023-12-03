function buscarProductos() {
    const searchInput = document.getElementById("searchInput");
    const searchValue = searchInput ? searchInput.value : '';
    ListProducts(searchValue);
}

function ListProducts(search = null) {
    var url =backendPathGeneric + '/product';
    if (search.length > 0)
        url += '?search=' + encodeURIComponent(search);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const cuerpoTabla = document.getElementById("cuerpoTablaProductos");
            if (Array.isArray(data.products)) {
                cuerpoTabla.innerHTML = "";
                data.products.forEach(producto => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td hidden="True" align="center">${producto.id}</td>
                        <td>${producto.name}</td>
                        <td>${producto.description}</td>
                        <td align="center">${producto.quantity}</td>
                        <td align="center">${producto.unit.name}</td>
                        <td align="center">${producto.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</td>
                        <td>
                            <button class="btn btn-warning" onclick="GetProduct(${producto.id})"><i class="fa fa-edit" aria-hidden="true"></i></button>
                            <button class="btn btn-danger" onclick="DeleteProduct(${producto.id})"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>
                    `;

                    cuerpoTabla.appendChild(fila);
                });
            } else {
                cuerpoTabla.innerHTML = `<tr><td colspan="7" align="center">No se encontraron productos.</td></tr>`;
            }
        })
        .catch(error => {
            console.error("Error al obtener productos:", error)
        });
}

function GetProduct(product_id) {

}

function cargarOpcionesUnidad() {
    fetch(backendPathGeneric + "/unit")
        .then(response => response.json())
        .then(data => {
            const unidadSelect = document.getElementById("unidad");
            unidadSelect.innerHTML = "";
            data.units.forEach(unidad => {
                const option = document.createElement("option");
                option.value = unidad.id;
                option.text = unidad.name;
                unidadSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error al cargar opciones de unidad:", error));
}

function abrirCrearProductoModal() {
    document.getElementById("crearProductoForm").reset();
    cargarOpcionesUnidad();
    $('#crearProductoModal').modal('show');

}

function CreateProduct() {
    const name = document.getElementById("nombre").value;
    const description = document.getElementById("descripcion").value;
    const quantity = document.getElementById("cantidad").value;
    const price = document.getElementById("precio").value;
    const unit_id = document.getElementById("unidad").value;
    const fotoInput = document.getElementById("foto");

    var nuevoNombreFoto = "not_available.png"

    if (fotoInput.files.length > 0) {
        const fotoFile = fotoInput.files[0];
        const timestamp = new Date().getTime();
        nuevoNombreFoto = `${timestamp}.${fotoFile.name.split('.').pop()}`;
    }

    let data = {
        name: name,
        description: description,
        quantity: quantity,
        price: price,
        unit_id: unit_id,
        photo_name: nuevoNombreFoto,
      };

      fetch(backendPathGeneric + "/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error al crear el producto: ${response.statusText}`);
            }else {
                console.log("Producto creado correctamente");
                buscarProductos();
                $('#crearProductoModal').modal('hide');
            }
        })
        .catch(error => console.error("Error al crear el producto:", error));
}

function UpdateProduct(product_id) {

}

function DeleteProduct(product_id) {
    const confirmarEliminacionBtn = document.getElementById("confirmarEliminacionBtn");
    confirmarEliminacionBtn.onclick = function () {
        $('#confirmModal').modal('hide');
        var url =backendPathGeneric + `/product/${product_id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al eliminar el producto: ${response.statusText}`);
                }
                console.log("Producto eliminado correctamente");
                buscarProductos();
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
            });
    };
    $('#confirmModal').modal('show');
    
}

document.addEventListener("DOMContentLoaded", function () {
    buscarProductos();
    cargarOpcionesUnidad();
});
