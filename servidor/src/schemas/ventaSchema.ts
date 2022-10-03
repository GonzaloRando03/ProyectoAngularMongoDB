import {Schema, model, Types } from 'mongoose'
// Definimos el Schema
const ventaSchema = new Schema({
    idVenta:{
        type: Number,
        unique: true,
        required: [true, "Id requerido para crear un objeto"]

    },
    vendedor: {
        type: String,
        required: [true, "Vendedor requerido para crear un objeto"]
    },
    comprador: {
        type: String,
        required: [true, "Comprador requerido para crear un objeto"]
    },
    fechaVenta: {
        type: Date,
        validate: [fechaMinima, "La fecha debe ser mayor a 2015"]
    }
})

/* funcion que valida la fecha minima de la venta */
function fechaMinima(fecha:Date) {
    return fecha >= new Date('2015-01-01');
  }

export const Venta = model('ventas', ventaSchema)  