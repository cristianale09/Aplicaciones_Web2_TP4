import mongoose from 'mongoose';

const { Schema, models, model, ObjectId } = mongoose;

//instanciamos una schema
const userSchema = new Schema({
    //nombre de la clave
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client'
    }
})

const User = models.user || model('user', userSchema)

export default User