// Función para cargar el contenido de una pagina en el div principal
function cargarPagina(pagina) {
    const mainContent = document.getElementById('main-container');
    fetch(`/pages/${pagina}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Página ${pagina} no encontrada`);
            }
            if (pagina=="admin") {
                fetch('http://localhost:5001/product')
                                                .then(function (response) {
                                                    console.log(response.json())
                                                    return response.json()
                                                    // if (response.ok) {return response.json(); }
                                                })
                                                .then(function (data) {
                                                    console.log(data)
                                                    let tablaProductos = '';

                                                    // Iteramos sobre los productos y agregamos filas a la tabla
                                                    for (let producto of data) {
                                                        let fila = document.createElement('tr');
                                                        fila.innerHTML = '<td>' + producto.id + '</td>' +
                                                            '<td>' + producto.name + '</td>' +
                                                            '<td align="right">' + producto.quantity + '</td>' +
                                                            '<td align="right">' + producto.price + '</td>';
                                                            // Mostrar miniatura de la imagen
                                                            //'<td><img src=./static/imagenes/' + producto.imagen_url +' alt="Imagen del producto" style="width: 100px;"></td>' +
                                                            //'<td align="right">' + producto.proveedor + '</td>';
                                                        tablaProductos.appendChild(fila);
                                                    }
                                                })
                                                .catch(function (error) {
                                                    // Código para manejar errores
                                                    alert('Error al obtener los productos.');
                                                });
                                                return response.text().document.getElementById('tablaProductos');
            }
            return response.text();
        })
        .then(html => {
            mainContent.innerHTML = html;
        })
        .catch(error => {
            console.error(error.message);
            cargarPagina('error_404');
        });
}

cargarPagina('home');