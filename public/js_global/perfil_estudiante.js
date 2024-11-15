document.addEventListener("DOMContentLoaded", async () => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log("Usuario en perfil: ", usuario);

    if (usuario && usuario.userId) {
        const userId = usuario.userId; // Aquí ya tenemos el userId
       

        try {
            
            const response = await fetch(`http://localhost:5500/cursos/${userId}/cursos_comprados`);
            const cursos = await response.json();


            if(cursos.length === 1){
                console.log('objeto con solo un elemento');

            }else{
                console.log("Respuesta de cursos comprados:", cursos);
            }

            const categorias = {};
            cursos.forEach(curso => {
                if (!categorias[curso.categoria]) {
                    categorias[curso.categoria] = [];
                }
                categorias[curso.categoria].push(curso);
            });

           const contenedorCursos_Comprados = document.getElementById("contenedorCursos_Comprados");

            // Aquí generamos las categorías con los cursos
            for (const [categoria, cursos] of Object.entries(categorias)) {
                const categoriaDiv = document.createElement("div");
                categoriaDiv.classList.add("categoria");

                const tituloCategoria = document.createElement('h2');
                tituloCategoria.textContent = categoria;
                categoriaDiv.appendChild(tituloCategoria);

                cursos.forEach(curso => {
                    const cursoDiv = document.createElement("div");
                    cursoDiv.classList.add("curso");
                    cursoDiv.innerHTML = `
                        <img src="${curso.url_imagen}" alt="Imagen del curso">
                        <h3>${curso.titulo}</h3>
                        <p>${curso.descripcion}</p>
                        <p>Precio: $${curso.precio}</p>
                        <button onclick="verCurso('${curso.url_video}')">Play</button>
                    `;
                    categoriaDiv.appendChild(cursoDiv);
                });
                
                contenedorCursos_Comprados.appendChild(categoriaDiv);
            }

        } catch (error) {
            console.error("Error al cargar los cursos comprados: ", error);
        }
    } else {
        console.log("No se encontró un usuario en localStorage o el usuario no tiene userId.");
    }
});

// Función para ver el curso
function verCurso(url) {
    window.location.href = url;
}
