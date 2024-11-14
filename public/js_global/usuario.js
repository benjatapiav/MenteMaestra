
//Mostrar el formulario correspondiente segun el usuario que quiere registrar
function mostrarFormulario(){
    const tipoUsuario = document.getElementById("tipoUsuario").value;
    const formularioEstudiante = document.getElementById("formularioEstudiante");
    const formularioProfesor = document.getElementById("formularioProfesor");

    //Si el tipo de usuario es estudiante muestra el formulario correspondiente y extrae los campos de este
    if (tipoUsuario === "estudiante"){ 
        formularioEstudiante.style.display = "block";
        formularioProfesor.style.display = "none";
        mostrarCampo(formularioEstudiante, true);
        mostrarCampo(formularioProfesor, false);

    }else if(tipoUsuario === 'profesor'){
        formularioEstudiante.style.display = "none";
        formularioProfesor.style.display = "block";
        mostrarCampo(formularioEstudiante, false);
        mostrarCampo(formularioProfesor, true);

    }else{
        console.log('rol no valido');
    }
}
// funcion para tomar los campos correspondientes segun usuario
function mostrarCampo(formulario, habilitar){
    const campos = formulario.querySelectorAll("input,select");
    campos.forEach(campo => {
        campo.disabled = !habilitar;
    });
}

window.addEventListener('load', function() {
    mostrarFormulario(); // Mostrar el formulario correcto al cargar
});

// --------------------------------------------------------------------------------------------------- //
//Adquirir valores de usuarios segun corresponda
document.getElementById("registroFormulario").addEventListener('submit', async (event) => {
    event.preventDefault();

    //obtener el tipo de usuario seleccionado
    const tipoUsuario = document.getElementById('tipoUsuario').value;

    //crear objeto usuario
    let usuarioData ={};

    if(tipoUsuario === 'estudiante') { //Si el valor tipoUsuario es estudiante, guarda los valores del campo
        usuarioData = {
            tipoUsuario: tipoUsuario,
            rutEstudiante: document.getElementById('rutEstudiante').value,
            nombreEstudiante: document.getElementById('nombreEstudiante').value,
            apellidoEstudiante: document.getElementById('apellidoEstudiante').value,
            correoEstudiante: document.getElementById('correoEstudiante').value,
            claveEstudiante: document.getElementById('claveEstudiante').value
        };
    }else if(tipoUsuario === 'profesor'){ //Si el valor tipoUsuario es profesor, guarda los valores del campo
        usuarioData = {
            tipoUsuario: tipoUsuario,
            rutProfesor: document.getElementById('rutProfesor').value,
            nombreProfesor: document.getElementById('nombreProfesor').value,
            apellidoProfesor: document.getElementById('apellidoProfesor').value,
            correoProfesor: document.getElementById('correoProfesor').value,
            claveProfesor: document.getElementById('claveProfesor').value,
            nombreCanal: document.getElementById('nombreCanal').value,
            categoria: document.getElementById('categoria').value
        };
    }
    try { //manejo de consulta en url
        const response = await fetch('http://localhost:5501/usuarios/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioData)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Usuario registrado exitosamente');
            document.getElementById("registroFormulario").reset(); //Resetear los campos
        } else {
            const error = await response.json();
            alert('Error al registrar usuario: ' + error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la solicitud');
    }
});
//----------------------------------------------------------------------------------------------------------------
// Manejo de logeo

