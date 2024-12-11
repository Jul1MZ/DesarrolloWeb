document.getElementById('search').addEventListener('input', () => {
    const parametroBusqueda = document.getElementById('search').value;
    console.log(parametroBusqueda);
    fetch(`http://localhost:3000/api/buscar-juegos?q=${parametroBusqueda}`)
        .then(response => response.json())
        .then(results => {
            const resultados = document.getElementById('juegos');
            resultados.innerHTML = ''; // Limpiar resultados anteriores
            results.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('juego')
                div.innerHTML = `<img src="${item.Imagen}" alt="imagen">
                        <h3>${item.Nombre}</h3>
                        <p>${item.Precio}</p>
                        <button>Carrito</button>`;
                resultados.appendChild(div);
            });
        });
});

function cargarCategorias() {
    fetch(`http://localhost:3000/api/obtener-categorias`)
    .then(response => response.json())
    .then(results => {
        const categorias = document.getElementById('categorias');
        categorias.innerHTML = ''; // Limpiar categorías anteriores
        results.forEach(categoria => {
            const li = document.createElement('li');
            li.classList.add('item-categoria');
            li.innerHTML = `<button class="cat-btn" data-id="${categoria.ID_Genero}">${categoria.Nombre}</button>`;
            categorias.appendChild(li);
        });

        // Añadir event listeners a los botones de categoría
        document.querySelectorAll('.cat-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const categoriaId = event.target.getAttribute('data-id');
                filtrarJuegosPorCategoria(categoriaId);
            });
        });
    });
}

function filtrarJuegosPorCategoria(categoriaId) {
    fetch(`http://localhost:3000/api/filtro-categorias?id=${categoriaId}`)
        .then(response => response.json())
        .then(results => {
            const resultados = document.getElementById('juegos');
            resultados.innerHTML = ''; // Limpiar resultados anteriores
            results.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('juego');
                div.innerHTML = `<img src="${item.Imagen}" alt="imagen">
                        <h3>${item.Nombre}</h3>
                        <p>${item.Precio}</p>
                        <button>Carrito</button>`;
                resultados.appendChild(div);
            });
        });
}

document.getElementById('subir-juegos').addEventListener('click', (e) => {
    e.preventDefault();
    subirDatos();
})

document.getElementById('buscar-juegos').addEventListener('click', (e) => {
    e.preventDefault();
    buscarJuegos();
})

document.getElementById('limpiar-juegos').addEventListener('click', (e) => {
    e.preventDefault();
    limpiarJuegos();
})

document.getElementById('borrar-juegos').addEventListener('click', (e) => {
    e.preventDefault();
    borrarJuegos(document.getElementById('id-juego'));
})

async function subirDatos () {
    const descuento = document.getElementById('descuento-juego').value;
    const precio = document.getElementById('precio-juego').value;
    const imagen = document.getElementById('imagen-juego').value;
    const imagenNombre = imagen.split('\\').pop();

    let precioDescuento;

    if (descuento > 0) {
        const porcentajeDescuento = descuento / 100;
        precioDescuento = parseFloat(precio*porcentajeDescuento);
    } else {
        precioDescuento = 0;
    }
    // Crear un objeto con los datos
    const juego = {
        ID_Juego: document.getElementById('id-juego').value,
        Nombre: document.getElementById('nombre-juego').value,
        ID_Genero: document.getElementById('genero-juego').value,
        Precio: Math.round((precio - precioDescuento)*100) / 100,
        Descripcion: document.getElementById('descripcion-juego').value,
        Imagen: 'IMG/' + imagenNombre,
        FechaDescuento: document.getElementById('fecha-descuento-juego').value,
        Descuento: descuento
    };
   if(confirm('¿Estás seguro de insertar o modificar este registro? Corrobora que el ID no exista en la base de datos, si existe se modificará.')) {
    try {
        // Envia los datos al backend usando fetch
        const response = await fetch('http://localhost:3000/api/subir-juegos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(juego),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          const data = await response.json();
          console.log('Datos guardados correctamente:', data);
          alert('Datos guardados correctamente');
          limpiarJuegos()
        } else {
          throw new Error('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error al guardar datos:', error);
        alert('Hubo un error al guardar los datos');
      }
   }
}

async function borrarJuegos(id_juego){
    console.log('juego a eliminar' + id_juego)
    if(confirm('seguro que deseas eliminar este juego?')){
        try {
            const respuesta = await fetch(`http://localhost:3000/api/borrar-juegos/${id_juego}`, {
                method: 'DELETE',
            });
            if (respuesta.ok){
                const data = await respuesta.json();
                console.log ('juego eliminado:' + data)
                alert('juego eliminado correctamente')
                limpiarJuegos();
            }else {
                const errorData = await respuesta.json()
                alert(`error:${errorData.error}`)
            }
        } catch(error){
            console.error('error al eliminar el juego:' + error)
            alert('hubo un error al eliminar el juego')
        }
    }
}

document.getElementById('limpiar-categoria').addEventListener('click', (e) => {
    e.preventDefault();
    limpiarCategorias();
})

document.getElementById('subir-categoria').addEventListener('click', (e) => {
    e.preventDefault();
    subirCategorias();
})

document.getElementById('buscar-categoria').addEventListener('click', (e) => {
    e.preventDefault();
    buscarCategorias();
})

document.getElementById('borrar-categoria').addEventListener('click', (e) => {
    e.preventDefault();
    borrarCategorias(document.getElementById('id-genero').value);
})



async function subirCategorias () {
    const categoria = {
        ID_Genero: document.getElementById('id-genero').value,
        Nombre: document.getElementById('nombre-genero').value
    };

   if(confirm('¿Estás seguro de insertar o modificar este registro? Corrobora que el ID no exista en la base de datos, si existe se modificará.')) {
    try {
        // Envia los datos al backend usando fetch
        const response = await fetch('http://localhost:3000/api/subir-categorias', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoria),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          const data = await response.json();
          console.log('Datos guardados correctamente:', data);
          alert('Datos guardados correctamente');
          limpiarCategorias()
        } else {
          throw new Error('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error al guardar datos:', error);
        alert('Hubo un error al guardar los datos');
      }
   }
}

async function borrarCategorias(id_genero){
    console.log('categoria a eliminar' + id_genero)
    if(confirm('seguro que deseas eliminar esta categoria?')){
        try {
            const respuesta = await fetch(`http://localhost:3000/api/borrar-categorias/${id_genero}`, {
                method: 'DELETE',
            });
            if (respuesta.ok){
                const data = await respuesta.json();
                console.log ('categoria eliminada:' + data)
                alert('categoria eliminada correctamente')
                limpiarCategorias();
            }else {
                const errorData = await respuesta.json()
                alert(`error:${errorData.error}`)
            }
        } catch(error){
            console.error('error al eliminar la categoria:' + error)
            alert('hubo un error al eliminar la categoria')
        }
    }
}

async function buscarJuegos() {
    const parametroBusqueda = document.getElementById('id-juego').value;
    console.log(parametroBusqueda);
    fetch(`http://localhost:3000/api/buscar-juegos-form?q=${parametroBusqueda}`)
        .then(response => response.json())
        .then(results => {

            if (results.length === 0) {
                console.warn('No se encontraron resultados para la búsqueda');
                return;
            }
            console.log('Juego recibido' + results)

            const juego = results[0];
            
            const fechaOriginal = new Date(juego.FechaDescuento);
            const fechaFormateada = fechaOriginal.toISOString().split('T')[0];
            // Asignamos los valores recibidos a cada campo del formulario
            document.getElementById('id-juego').value = juego.ID_Juego;
            document.getElementById('nombre-juego').value = juego.Nombre;
            document.getElementById('genero-juego').value = juego.ID_Genero;
            document.getElementById('precio-juego').value = juego.Precio;
            document.getElementById('descripcion-juego').value = juego.Descripcion;
            document.getElementById('fecha-descuento-juego').value = fechaFormateada;
            document.getElementById('descuento-juego').value = juego.Descuento;
        })
        .catch(err => console.error('Error al obtener los datos:', err));
        };

function limpiarJuegos() {
    const inputs = document.querySelectorAll('#formulario-juegos input, #formulario-juegos select');
    inputs.forEach(input => {
        input.value = ''
    })
}


async function buscarCategorias() {
    const parametroBusqueda = document.getElementById('id-genero').value;
    console.log(parametroBusqueda);
    fetch(`http://localhost:3000/api/buscar-categorias-form?q=${parametroBusqueda}`)
        .then(response => response.json())
        .then(data => {

            if (data.length === 0) {
                console.warn('No se encontraron resultados para la búsqueda');
                return;
            }
            console.log('Categoria recibida' + data)

            const genero = data[0];
        
            // Asignamos los valores recibidos a cada campo del formulario
            document.getElementById('id-genero').value = genero.ID_Genero;
            document.getElementById('nombre-genero').value = genero.Nombre;
        })
        .catch(err => console.error('Error al obtener los datos:', err));
};

function limpiarCategorias() {
    const inputs = document.querySelectorAll('#formulario-categorias input');
    inputs.forEach(input => {
        input.value = ''
    })
}

async function mostrarCategorias() {
    try {
      const response = await fetch('http://localhost:3000/api/obtener-categorias');
      const categorias = await response.json();
  
      const selectCategorias = document.getElementById('genero-juego');
      categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.ID_Genero; // Usar ID_condicion como valor
        option.textContent = categoria.Nombre; // Mostrar la descripción al usuario
        selectCategorias.appendChild(option);
      });
    } catch (error) {
      console.error('Error al cargar categorias:', error);
    }
  }


  const overlay = document.querySelector('.overlay');
  const moduloCarga = document.querySelector('.formulario-carga');
  const formBtn = document.getElementById('subir-datos').addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.classList.remove('disabled');
      moduloCarga.classList.remove('disabled');
  });
  
  const formCerrar = document.querySelector('.cerrar').addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.classList.add('disabled');
      moduloCarga.classList.add('disabled');
  });
  
  // Cierra el formulario si se hace clic en el overlay
  overlay.addEventListener('click', () => {
      overlay.classList.add('disabled');
      moduloCarga.classList.add('disabled');
  });

