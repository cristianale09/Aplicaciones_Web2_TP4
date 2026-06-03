import { Router} from "express";
import { readFile, writeFile} from 'fs/promises'
import { createProd } from '../db/actions/product.actions.js'

//Creamos un router para manejar las rutas relacionadas con los usuarios
const router = Router()

/*RUTAS DE USUARIOS*/
const fileUsers = await readFile(new URL('../data/users.json', import.meta.url),'utf-8')
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

//modelo de consulta
router.get('/all', (req,res)=>{
    try {
        
        res.status(200).json()
    } catch (error) {
        
        res.status(400).json()
    }
})

//modelo de consulta
router.get('/byId/:id', (req,res)=>{
    const category = req.params.category
    console.log(category)
    try {
        
        res.status(200).json()
    } catch (error) {
        
        res.status(400).json()
    }
})

//modelo de consulta
router.post('/create', async(req,res)=>{
    const {name, desc, stock, price} = req.body
    try {
        const result = await createProd({name, desc, price, stock, category})
        console.log(result)
        res.status(200).json()
    } catch (error) {
        
        res.status(400).json()
    }
})

export default router