"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marca = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const marcaSchema = new mongoose_1.Schema({
    _id: {
        type: String,
    },
    ordenadores: {
        type: [Number]
    },
    noProvisiones: {
        type: Number,
    }
});
exports.Marca = (0, mongoose_1.model)('marcas', marcaSchema);
