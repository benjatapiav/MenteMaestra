document.addEventListener("DOMContentLoaded", () => {
    const loginFormulario = document.getElementById('loginFormulario');

    loginFormulario.addEventListener("submit", async (event) =>{
        event.preventDefault();

        const correo = document.getElementById('correo').value;
        const clave = document.getElementById('clave').value;

        try{
            const response = await fetch("http://localhost:5501/usuarios/login",{
                method: 'POST',
                headers:{ "Content-Type":"application/json"},
                body: JSON.stringify({correo,clave})
            });

            if (!response.ok){
                const errorData = await response.json();
                alert(errorData.message);
                return;
            }

            const data = await response.json();
            console.log('Respuesta del servidor: ',data);

            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            

            window.location.href = ' index.html';

        }catch(error){
            console.error("Error en login: ", error);
            alert("Error en el serivicio");
        }
    });
});