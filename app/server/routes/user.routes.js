import { Router} from "express";
import { createProd } from '../db/actions/product.actions.js'
import { createUser, findAllUsers, findUserById, updateUser, deleteUser } from '../db/actions/user.action.js'
import User from "../db/schemas/user.schema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { decodedToken } from '../utils/middleware.js';
import { connectToDatabase } from '../db/connection.js';
import 'dotenv/config';

//Creamos un router para manejar las rutas relacionadas con los usuarios
const router = Router()
const SECRET = process.env.JWT_SECRET;

/* =============================================
                INICIAR SESION
============================================= */

router.post('/login', async (req, res) => {

    const { userName, password } = req.body;
    try {
        await connectToDatabase();
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'Usuario no encontrado'
            });
        }
        const validPassword = bcrypt.compareSync( password, user.password );
        if (!validPassword) {
            return res.status(401).json({
                status: false,
                message: 'Contraseña incorrecta'
            });
        }
        const token = jwt.sign(
            {
                id: user._id,
                userName: user.userName,
                name: user.name,
                role: user.role
            },
            SECRET,
            { expiresIn: '24h' }
        );
        res.status(200).json({
            status: true,
            token
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

/* =============================================
                CREAR USUARIO
============================================= */

//modelo de consulta
router.post('/create', async (req, res) => {

    const { name, lastName, userName, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, 8);
        const result = await createUser(
            name,
            lastName,
            userName,
            hashedPassword,
            {
                "role" : "client"
            }
        );
        res.status(201).json({
            status: true,
            message: 'Usuario creado exitosamente',
            user: result
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

/* =============================================
            LEER USUARIOS JWT
============================================= */

router.post('/decodedToken', async (req, res) => {
    const token = req.body?.token;
    const result = await decodedToken(token);
    if (!token) {
        return res.status(400).json({
            status: false,
            message: 'Token requerido'
        });
    }
    if (!result) {
        return res.status(401).json({
            status: false,
            message: 'Token inválido'
        });
    }
    res.status(200).json(result);
});

/* =============================================
                BUSCAR TODOS
============================================= */

router.get('/all', async (req, res) => {
    try {
        const result = await findAllUsers();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

/* =============================================
                BUSCAR POR ID
============================================= */

router.get('/:id', async (req, res) => {
    try {
        const result = await findUserById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
});

/* =============================================
                MODIFICAR
============================================= */

router.put('/:id', async (req, res) => {
    try {
        const result = await updateUser(
            req.params.id,
            req.body
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

/* =============================================
                ELIMINAR
============================================= */

router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteUser(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


export default router