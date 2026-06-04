import { connectToDatabase } from "../connection.js"
import Category from "../schemas/category.schema.js"
import Product from "../schemas/product.schema.js"

/* =============================================
                CREAR DATOS
============================================= */

//creamos un producto en la base de datos
export const createProd = async({name, brand, category, price, stock, rating, image})=>{
    try {
        await connectToDatabase()
        const res = await Product.create({name, brand, category, price, stock, rating, image})

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
        const products = await Product.find().populate({path:"category"})  //si no va nada entre parentesis encuentra todos los productos
        return JSON.parse(JSON.stringify(products))
    }catch (error) {
        throw error;
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
        const res = await Product.find({category}).populate({path:"category"})
        return JSON.parse(JSON.stringify(res))
    }catch (error) {
        console.log(error)
    }
}

/* =============================================
                ACTUALIZAR DATOS
============================================= */

//actualizar todos los datos
export const updateNameById = async(name, id, brand, category, price, stock, rating, image)=>{
    try {
        await connectToDatabase()
        const res = await Product.findByIdAndUpdate(id, {name, brand, category, price, stock, rating, image}, {new: true})
        return JSON.parse(JSON.stringify(res))
    }catch (error) {
        console.log(error)
    }
}

/* =============================================
                BORRAR DATOS
============================================= */

//borrar un producto por su ID
export const deleteProductById = async(id)=>{
    try {
        await connectToDatabase()
        const res = await Product.findByIdAndDelete(id)
        return JSON.parse(JSON.stringify(res))
    }catch (error) {
        console.log(error)
    }
}