// script.js

// Manejo de clics en las categorías
document.querySelectorAll('#dropdown a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        const category = this.getAttribute('data-category');
        console.log(`Categoría seleccionada: ${category}`); // Solo para comprobar en consola
        // Aquí podrías llamar a la función para mostrar cursos, si la necesitas
    });
});

// Mostrar el dropdown al pasar el mouse sobre el menú
document.getElementById('menu').addEventListener('mouseover', function() {
    document.getElementById('dropdown').style.display = 'block';
});

// Ocultar el dropdown al salir del mouse
document.getElementById('menu').addEventListener('mouseout', function() {
    document.getElementById('dropdown').style.display = 'none';
});


