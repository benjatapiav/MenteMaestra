// Conseguir informacion de cursos
async function getCursos() {
    try {
        const res = await fetch("http://localhost:5500/cursos");
        const resJson = await res.json();
        return resJson;
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
    }
}

const contenedorCursos = document.getElementById("contenedorCursos");

function crearTarjetasCursos(cursos) {
    cursos.forEach(curso => {
        const nuevoCurso = document.createElement("div");
        nuevoCurso.classList.add("tarjeta-curso");
        nuevoCurso.innerHTML = `
            <img src="${curso.url_imagen}" alt="Imagen del curso">
            <h3>${curso.titulo}</h3>
            <p>${curso.descripcion}</p>
            <p>Precio: $${curso.precio}</p>
            <p>Calificación: ${curso.calificacion}</p>
            <button>Agregar al carrito</button>
        `;
        contenedorCursos.appendChild(nuevoCurso);
    });
}

// Llamar a getCursos para cargar los cursos
getCursos().then(cursos => {
    crearTarjetasCursos(cursos);
});


