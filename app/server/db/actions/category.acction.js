import { conectToDataBase } from "../connection.js"
import Product from "../schemas/product.schema.js"
import Category from "../schemas/category.schema.js"

/* =============================================
                Crear categoría
============================================= */

export const createCategory = async(name) => {
    try {
        await conectToDataBase()
        const res = await Category.create({name})

        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}

/* =============================================
        buscar todas las categorías
============================================= */

export const findAll = async() => {
    try {
        await conectToDataBase()
        const res = await Product.find()

        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}