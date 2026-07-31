import express from 'express'
import { connectToDatabase } from '../db/connection.js';
import { createCategory, findAll, findCategoryById, updateCategory, deleteCategory} from '../db/actions/category.acction.js';
import { readFile } from 'fs/promises'
import Category from '../db/schemas/category.schema.js';
import Product from '../db/schemas/product.schema.js';

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

        if (categoryFound) {
            return res.status(400).json({
                message: 'Categoría ya existe'
            });
        }

        const result = await createCategory(
            name
        );

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
        const result = await findCategoryById(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: 'Error al leer la categoria' })
    }
})

/* =============================================
                ACTUALIZAR CATEGORIA
============================================= */

router.put('/updateCategory/:id', async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    try {
        const result = await updateCategory(id, name);

        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

/* =============================================
                BORRAR CATEGORIA
============================================= */

router.delete('/deleteCategory/:id', async (req, res) => {
    const id = req.params.id

    try {
        const result = await Category.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).json({
                message: "Categoría no encontrada"
            });
        }

        res.status(200).json({
            message: "Categoría eliminada correctamente",
            category: result
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
})


export default router