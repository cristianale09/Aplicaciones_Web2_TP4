import { Router} from "express";
import { readFile, writeFile} from 'fs/promises'

//Creamos un router para manejar las rutas relacionadas con los usuarios
const router = Router()

/*RUTAS DE USUARIOS*/
const fileUsers = await readFile('../data/users.json', 'utf-8')
const userData = JSON.parse(fileUsers)

/*LOGIN*/
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    //validación de campos vacíos
    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan credenciales' });
    }

    const result = userData.find(e => e.username === username && e.password === password);

    if (result) {
        //devolvemos solo lo necesario, sin exponer la contraseña
        const data = {
            id: result.id_user,
            name: result.name,
            lastName: result.lastname,
            userName: result.username,
            status: true
        }
        return res.status(200).json({ message: 'Login exitoso', user: data });
    }

    return res.status(401).json({ status: false, message: 'Credenciales inválidas' });
});

export default router