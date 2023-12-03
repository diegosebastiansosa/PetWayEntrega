async function openProductModal(isCreate = true, product_id = 0) {
    const modalTitle = isCreate ? 'Crear Nuevo Producto' : 'Actualizar Producto';
    const modalElement = document.getElementById("crearProductoModal");

    const modalTitleElement = modalElement.querySelector('.modal-title');
    modalTitleElement.textContent = modalTitle;
    uploadUnitOptions();
    const productForm = document.getElementById("ProductFormModal");
    productForm.reset();
    document.getElementById('previewFoto').src = "/assets/img/not_available.png";
    if(product_id > 0){
        document.getElementById('btnCreate').style.display = 'none';
        document.getElementById('btnUpdate').style.display = 'block';
        const product = await GetProduct(product_id);
        if (product) {
            console.log(product)
            UploadForm(product);

        } else {
            return
        }
    }else{
        document.getElementById("product_id").textContent = 0
        document.getElementById('btnCreate').style.display = 'block';
        document.getElementById('btnUpdate').style.display = 'none';
    };

    $('#crearProductoModal').modal('show');
}

function previewImage(){
    const fotoInput = document.getElementById("foto");
    const previewFoto = document.getElementById("previewFoto");
    if (fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewFoto.src = e.target.result;
        };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        previewFoto.src = "/assets/img/not_available.png";
    }
}

function UploadForm(product){
    document.getElementById("product_id").textContent = product.product.id;
    document.getElementById("photo_name").textContent = product.product.photo_name;

    document.getElementById("nombre").value = product.product.name;
    document.getElementById("descripcion").value = product.product.description;
    document.getElementById("cantidad").value = product.product.quantity;
    document.getElementById("precio").value = product.product.price;
    document.getElementById("unidad").value = product.product.unit.id;

    const imgElement = document.getElementById("previewFoto");

    if (product.product.image) {
        imgElement.src = `data:image/png;base64,${product.product.image}`;
    } else {
        imgElement.src = "/assets/img/not_available.png";
    }
}

function searchProduct() {
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
                            <button class="btn btn-warning" onclick="openProductModal(false, ${producto.id})"><i class="fa fa-edit" aria-hidden="true"></i></button>
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

async function GetProduct(product_id) {
    var url = backendPathGeneric + `/product/${product_id}`;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(`Error al obtener el producto: ${response.statusText}`);
        }

        const productData = await response.json();
        return productData;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        return null;
    }
}

function uploadUnitOptions() {
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

function CreateProduct() {
    const name = document.getElementById("nombre").value;
    const description = document.getElementById("descripcion").value;
    const quantity = document.getElementById("cantidad").value;
    const price = document.getElementById("precio").value;
    const unit_id = document.getElementById("unidad").value;
    const fotoInput = document.getElementById("foto");

    var nuevoNombreFoto = "not_available.png";

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("unit_id", unit_id);

    if (fotoInput.files.length > 0) {
        formData.append("photo", fotoInput.files[0]);
        nuevoNombreFoto = fotoInput.files[0].name;
    }
    formData.append("photo_name", nuevoNombreFoto)

    fetch(backendPathGeneric + "/product", {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error al crear el producto: ${response.statusText}`);
            } else {
                console.log("Producto creado correctamente");
                searchProduct();
                $('#crearProductoModal').modal('hide');
            }
        })
        .catch(error => console.error("Error al crear el producto:", error));
}

function UpdateProduct() {
    const product_id = document.getElementById("product_id").textContent;
    const photo_name = document.getElementById("photo_name").textContent;

    const name = document.getElementById("nombre").value;
    const description = document.getElementById("descripcion").value;
    const quantity = document.getElementById("cantidad").value;
    const price = document.getElementById("precio").value;
    const unit_id = document.getElementById("unidad").value;
    const fotoInput = document.getElementById("foto");

    var url =backendPathGeneric + `/product/${product_id}`;

    var nuevoNombreFoto = "not_available.png";

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("unit_id", unit_id);

    if (fotoInput.files.length > 0 && fotoInput.files[0].name != photo_name) {
        formData.append("photo", fotoInput.files[0]);
        nuevoNombreFoto = fotoInput.files[0].name;
    }else{
        nuevoNombreFoto = photo_name;
    }
    formData.append("photo_name", nuevoNombreFoto)

    fetch(url, {
        method: "PUT",
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error al crear el producto: ${response.statusText}`);
            } else {
                console.log("Producto creado correctamente");
                searchProduct();
                $('#crearProductoModal').modal('hide');
            }
        })
        .catch(error => console.error("Error al crear el producto:", error));
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
                searchProduct();
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
            });
    };
    $('#confirmModal').modal('show');
    
}

document.addEventListener("DOMContentLoaded", function () {
    searchProduct();
    uploadUnitOptions();
});
