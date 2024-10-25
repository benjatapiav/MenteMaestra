
document.getElementById("registroFormulario").addEventListener('submit', async (event) => {
    event.preventDefault();

    //obtener el tipo de usuario seleccionado
    const tipoUsuario = document.getElementById('tipoUsuario').value;

    //crear objeto usuario
    let usuarioData;

    if(tipoUsuario === 'estudiante') {
        usuarioData = {

            nombre: document.getElementById('nombreEstudiante').value,
            apellido: document.getElementById('apellidoEstudiante').value,
            correo: document.getElementById('correoEstudiante').value,
            clave: document.getElementById('claveEstudiante').value,
            rol: 'estudiante',
            nombreCanal: null, //estudiante no tiene canal
            categoria: null // estudiante no tiene categoria
        };
    }else if (tipoUsuario === 'profesor'){
        usuarioData = {
            nombre: document.getElementById('nombreProfesor').value,
            apellido: document.getElementById('apellidoProfesor').value,
            correo: document.getElementById('correoProfesor').value,
            clave: document.getElementById('claveProfesor').value,
            rol: 'profesor',
            nombreCanal: document.getElementById('nombreCanal').value,
            categoria: document.getElementById('categoria').value,
        };
    }
    try {
        const response = await fetch('http://localhost:5501/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioData)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Usuario registrado exitosamente');
            // Redirigir o hacer algo después del registro
        } else {
            const error = await response.json();
            alert('Error al registrar usuario: ' + error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la solicitud');
    }
});