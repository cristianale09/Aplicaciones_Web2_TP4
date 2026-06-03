import mongoose from "mongoose";

const { Schema, models, model } = mongoose

const categorySchema = new Schema ({
    name: {type:String, require: true, unique: true, uppercase: true} //uppercase convierte todo en mayuscula
})

const Category = model.category || model('category', categorySchema)

export default Category