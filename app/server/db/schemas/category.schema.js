import mongoose from "mongoose";

const { Schema, models, model } = mongoose

const categorySchema = new Schema ({
    name: {
        type:String, 
        require: true, 
        unique: true}
})

const Category = model.category || model('category', categorySchema)

export default Category