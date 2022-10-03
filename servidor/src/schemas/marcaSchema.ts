import {Schema, model, Types } from 'mongoose'
// Definimos el Schema
const marcaSchema = new Schema({
    _id:{
        type: String,
    },
    ordenadores: {
        type: [Number]
    },
    noProvisiones: {
        type: Number,

    }
})


export const Marca = model('marcas', marcaSchema)  