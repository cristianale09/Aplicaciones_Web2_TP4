import express from 'express'
import { connectToDatabase } from '../db/connection.js';
import {createProd, findAll, findByID, findByCategory, updateProductById} from '../db/actions/product.actions.js'; 
import { readFile } from 'fs/promises'
import Category from '../db/schemas/category.schema.js';
import Product from '../db/schemas/product.schema.js';

const router = express.Router()

/* =============================================
                CREAR DATOS
============================================= */

router.post('/create', async (req, res) => {
    const { name, brand, category, price, stock, rating, image } = req.body;

    try {
        await connectToDatabase();

        console.log("Mongo conectado");

        const categoryFound = await Category.findOne({
            name: category
        });

        if (!categoryFound) {
            return res.status(404).json({
                message: 'Categoría no encontrada'
            });
        }

        const result = await createProd({
            name,
            brand,
            category: categoryFound._id,
            price,
            stock,
            rating,
            image
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
                BUSCAR DATOS
============================================= */

//buscar todos
router.get('/all', async (req, res) => {
    try {
        const result = await findAll()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: 'Error al leer productos' })
    }
})

//buscar por id
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id

    try {
        const result = await findByID(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: 'Error al leer productos' })
    }
})

//buscar por categoría
router.get('/byCategory/:category', async (req, res) => {
    const category = req.params.category 

    try {
        const result = await findByCategory(category)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: 'Error al leer productos' })
    }
})

/* =============================================
                ACTUALIZAR DATOS
============================================= */

router.put('/updateProductById/:id', async (req, res) => {
    const id = req.params.id
    const { name } = req.body

    try {
        const result = await updateProductById(
            id,
            req.body
        );
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
            console.log(error);

        res.status(400).json({
            message: error.message
        });
    }
})

/* =============================================
                BORRAR DATOS
============================================= */

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {

        const result = await Product.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            message: "Producto eliminado correctamente",
            product: result
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
});

export default router