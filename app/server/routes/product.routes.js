import express from 'express'
import {createProd, findAll, findByID, findByCategory} from '../db/actions/product.actions.js'; 
import { readFile } from 'fs/promises'

const router = express.Router()

/* =============================================
                CREAR DATOS
============================================= */

router.post('/create', async (req, res) => {
    const { name, description, price, stock, category } = req.body

    try {
        const result = await createProd({ name, description, price, stock, category })
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: 'Error al crear producto' })
    }
})

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

export default router