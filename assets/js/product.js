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
            if (Array.isArray(data.products)) {
                const cuerpoTabla = document.getElementById("cuerpoTablaProductos");
                cuerpoTabla.innerHTML = "";
                data.products.forEach(producto => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td align="center">${producto.id}</td>
                        <td>${producto.name}</td>
                        <td>${producto.description}</td>
                        <td align="center">${producto.quantity}</td>
                        <td align="center">${producto.unit.name}</td>
                        <td align="center">${producto.price}</td>
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
    alert(product_id);
}

function CreateProduct() {
    alert('nuevo producto ingresado')
}

function UpdateProduct(product_id) {
    alert(product_id);
    buscarProductos();
}

function DeleteProduct(product_id) {
    alert(product_id);
    buscarProductos();
}

document.addEventListener("DOMContentLoaded", function () {
    buscarProductos();
});
