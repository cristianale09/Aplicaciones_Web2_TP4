import { connectToDatabase } from "../connection.js"
import Category from "../schemas/category.schema.js"
import Product from "../schemas/product.schema.js"
import User from "../schemas/user.schema.js"

/* =============================================
                Crear usuario
============================================= */

export const createUser = async (name, lastName, userName, password, role = "client") => {
    try {
        await connectToDatabase();

        const res = await User.create({
            name,
            lastName,
            userName,
            password,
            role
        });

        return JSON.parse(JSON.stringify(res));

    } catch (error) {
        console.log(error);
        throw error;
    }
}

/* =============================================
        Buscar todos los usuarios
============================================= */

export const findAllUsers = async() => {
    try {
        await connectToDatabase()
        const res = await User.find()
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}

/* =============================================
                buscar por id
============================================= */

export const findUserById  = async(id) => {
    try {
        await connectToDatabase();

        const user = await User.findById(id);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error)
    }
}

/* =============================================
            Modificar usuarios
============================================= */

export const updateUser = async (id, data) => {
    try {
        await connectToDatabase();

        const user = await User.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error)
    }
}

/* =============================================
            Eliminar usuarios
============================================= */

export const deleteUser = async (id) => {
    try {
        await connectToDatabase();

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return {
            message: 'Usuario eliminado correctamente'
        };
    } catch (error) {
        console.log(error)
    }
}