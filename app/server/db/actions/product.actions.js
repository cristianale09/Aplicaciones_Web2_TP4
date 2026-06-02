import { connectToDatabase } from "../connection.js"
import Product from "../schemas/product.schema.js"

//creamos un producto en la base de datos
export const createProd = async({name, desc, price, stock, category})=>{
    try {
        await connectToDatabase()
        const res = await Product.create({name, desc, price, stock, category})

        return JSON.parse(JSON.stringify(res))

    } catch (error) {
        console.log(error)
    }
} 