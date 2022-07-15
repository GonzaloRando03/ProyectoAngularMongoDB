"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const ventaSchema = new mongoose_1.Schema({
    idVenta: {
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
        validate: [fechaMinima, "Solo puedes poner 3 conexiones como máximo"]
    }
});
function fechaMinima(fecha) {
    return fecha >= new Date('2015-01-01');
}
exports.Venta = (0, mongoose_1.model)('ventas', ventaSchema);
