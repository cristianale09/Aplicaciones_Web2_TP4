import { connectToDatabase } from "../connection.js";
import Category from "../schemas/category.schema.js";

/* =============================================
                Crear categoría
============================================= */

export const createCategory = async(name) => {
    try {
        await connectToDatabase();

        return await Category.create({ name });
    } catch (error) {
        console.log(error)
    }
}

/* =============================================
        buscar todas las categorías
============================================= */

export const findAll = async() => {
    try {
        await connectToDatabase();

        return await Category.find();
    } catch (error) {
        console.log(error)
    }
}

/* =============================================
        buscar categoría por ID
============================================= */

export const findCategoryById  = async(id) => {
    try {
        await connectToDatabase();

        return await Category.findById(id);
    } catch (error) {
        console.log(error)
    }
}

/* =============================================
            Actualizar categoría
============================================= */

export const updateCategory = async(id, name) => {
    try {
        await connectToDatabase();

        return await Category.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
    } catch (error) {
        console.log(error)        
        throw error;
    }
}


/* =============================================
            Borrar categoría
============================================= */

export const deleteCategory = async (id) => {
    try {
        await connectToDatabase();
        const result = await Category.findByIdAndDelete(id);
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log(error)
        throw error;
    }
};