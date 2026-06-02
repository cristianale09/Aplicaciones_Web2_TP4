import express from 'express'
import { readFile } from 'fs/promises'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const data = await readFile('./data/products.json', 'utf-8')
        res.json(JSON.parse(data))
    } catch (error) {
        res.status(500).json({ message: 'Error al leer productos' })
    }
})

export default router