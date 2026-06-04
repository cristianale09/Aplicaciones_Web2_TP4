import mongoose from 'mongoose';

const { Schema, models, model, ObjectId } = mongoose;

//instanciamos una schema
const ProductSchema = new Schema({
    //nombre de la clave
    name: {type: String, required: true, unique: true},
    brand: {type: String, required: true},
    category: {type: ObjectId, required: true, ref: 'category'},
    price: {type: Number, required: true},
    stock: {type: Number, default: 0},
    rating: {type: Number, default: 0},
    image: {type: String, default: ""}
})

//creamos la conexion
const Product = models.product || model('product', ProductSchema) //si no existe lo creamos y lo guarda

export default Product