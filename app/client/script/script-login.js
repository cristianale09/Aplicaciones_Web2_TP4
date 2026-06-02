const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register--btn');
const loginBtn = document.querySelector('.login--btn');
const formRegistro = document.getElementById('formRegistro');
const formLogin = document.getElementById('formLogin');

//evento para mostrar el formulario de registro
registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

//evita que el formulario se envie y recargue la pagina
loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

/* registro */
formRegistro.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores de los inputs
    const userName = document.getElementById('userName').value;
    const mail = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    // Crear objeto con los datos del usuario
    const nuevoUsuario = {
        id: Date.now(), // ID único usando timestamp
        usuario: userName,
        correo: mail,
        contrasena: password, // En producción, NUNCA guardes contraseñas sin encriptar
        fechaRegistro: new Date().toISOString()
    };

    // Guardar en sessionStorage
    sessionStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    sessionStorage.setItem('estaAutenticado', 'true');

    // Mostrar mensaje de éxito
    alert('¡Registro exitoso!');

    formRegistro.reset();
});

/* login */
formLogin.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores ingresados
    const userIngresado = document.getElementById('userLogin').value.trim();
    const passwordIngresada = document.getElementById('passwordLogin').value;
    
    // Obtener el usuario guardado en sessionStorage
    const usuarioGuardado = sessionStorage.getItem('usuario');
    
    // Verificar si existe un usuario registrado
    if (!usuarioGuardado) {
        alert('No hay ningún usuario registrado. Por favor regístrate primero.');
        return;
    }

    // Convertir el string a objeto
    const usuario = JSON.parse(usuarioGuardado);
    
    // Verificar las credenciales
    if (usuario.usuario === userIngresado && usuario.contrasena === passwordIngresada) {
        // Login exitoso
        sessionStorage.setItem('estaAutenticado', 'true');
        sessionStorage.setItem('usuarioActivo', JSON.stringify(usuario));
        
        alert(`¡Bienvenido de nuevo ${usuario.usuario}!`);
        window.location.href = '../index.html';
    } else {
        // Credenciales incorrectas
        alert('Usuario o contraseña incorrectos');
        document.getElementById('passwordLogin').value = ''; // Limpiar contraseña
    }
});