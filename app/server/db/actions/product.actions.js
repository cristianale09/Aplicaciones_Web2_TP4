import { connectToDatabase } from "../connection.js"
import Product from "../schemas/product.schema.js"

//creamos un producto en la base de datos
export const createProd = async({name, description, price, stock, category})=>{
    try {
        await connectToDatabase()
        const res = await Product.create({name, description, price, stock, category})

        return JSON.parse(JSON.stringify(res))

    } catch (error) {
        console.log(error)
        throw error
    }
} 
/* =============================================
                BUSCAR DATOS
============================================= */

/* buscar todos*/
export const findAll = async()=>{
    try {
        await connectToDatabase()
        const res = await Product.find()  //si no va nada entre parentesis encuentra todos los productos
        return JSON.parse(JSON.stringify(res))
    }catch (error) {
        console.log(error)
    }
}

//buscar por id
export const findByID = async(id)=>{
    try {
        await connectToDatabase()
        const res = await Product.findById(id)
        return JSON.parse(JSON.stringify(res))
    }catch (error) {
        console.log(error)
    }
}

//buscar por categoría
export const findByCategory = async(category)=>{
    try {
        await connectToDatabase()
        const res = await Product.find({category})
        return JSON.parse(JSON.stringify(res))
    }catch (error) {
        console.log(error)
    }
}