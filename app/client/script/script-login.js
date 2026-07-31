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
formRegistro.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Obtener los valores de los inputs
    const name = document.getElementById('Name').value;
    const lastName = document.getElementById('lastName').value;
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    // Crear objeto con los datos del usuario
    const body = {
        name,
        lastName,
        userName,
        password
    };
    try {
        const response = await fetch(
            'http://localhost:3001/user/create',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );

        const data = await response.json();

        if (data.status) {
            alert('Usuario registrado');
            formRegistro.reset();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
    }
});

/* login */
formLogin.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Obtener los valores ingresados
    const userName = document.getElementById('userLogin').value.trim();
    const password = document.getElementById('passwordLogin').value;
    
    try {
        const response = await fetch(
            'http://localhost:3001/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName,
                    password
                })
            }
        );

        const data = await response.json();

        if (!data.status) {
            alert(data.message);
            return;
        }
        sessionStorage.setItem(
            'token',
            data.token
        );
        sessionStorage.setItem(
            'estaAutenticado',
            'true'
        );

        alert('Login exitoso');
        window.location.href =
            '../home/index.html';
    } catch (error) {
        console.error(error);
    }
});