import express from 'express'
import { connectToDatabase } from '../db/connection.js';
import {createProd, findAll, findByID, findByCategory} from '../db/actions/product.actions.js'; 
import { readFile } from 'fs/promises'
import Category from '../db/schemas/category.schema.js';
import Product from '../db/schemas/product.schema.js';
import { updateNameById } from '../db/actions/product.actions.js';

const router = express.Router()

/* =============================================
                CREAR CATEGORIA
============================================= */

router.post('/create', async (req, res) => {
    const { name } = req.body;

    try {
        await connectToDatabase();

        console.log("Mongo conectado");

        const categoryFound = await Category.findOne({
            name: name
        });

        if (!categoryFound) {
            return res.status(404).json({
                message: 'Categoría no encontrada'
            });
        }

        const result = await createProd({
            name
        });

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
});

/* =============================================
                BUSCAR CATEGORIA
============================================= */

//buscar todos
router.get('/all', async (req, res) => {
    try {
        const result = await findAll()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: 'Error al leer la categoria' })
    }
})

//buscar por id
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id

    try {
        const result = await findByID(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: 'Error al leer la categoria' })
    }
})

/* =============================================
                ACTUALIZAR CATEGORIA
============================================= */

router.patch('/updateByName/:id', async (req, res) => {
    const id = req.params.id
    const { name } = req.body

    try {
        const result = await updateNameById(name, id)
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar categoría' })
    }
})

/* =============================================
                BORRAR CATEGORIA
============================================= */

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id

    try {
        const result = await Category.findByIdAndDelete(id)
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: 'Error al borrar categoría' })
    }
})


export default router