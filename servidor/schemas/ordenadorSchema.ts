import {Schema, model, Types } from 'mongoose'
// Definimos el Schema
const ordenadorSchema = new Schema({
    idVenta:{
        type: Number,
        required: [true, "Id requerido para crear un objeto"]

    },

    idOrdenador:{
        type: Number,
        unique: true,
        required: [true, "Id requerido para crear un objeto"]

    },
    caracteristicas:{
        placa:{
            socket:{
                type: String,
                required: [true, "Socket requerido para crear un objeto"]
            },
            marca:{
                type: String,
                required: [true, "Marca requerida para crear un objeto"]
            },
            puertos:{
                type: [String],
                required: [true, "Puertos requerido para crear un objeto"]
            }
        },
        memoria: {
            capacidad:{
                type: Number,
                required: [true, "Capacidad requerida para crear un objeto"],
                min: 1,
                max: 128
            },
            tipo:{
                type: String,
                required: [true, "Tipo requerido para crear un objeto"]
            }
        },
        procesador:{
            marca:{
                type: String,
                enum:["amd", "intel", "AMD", "Intel"],
                required: [true, "Marca requerido para crear un objeto"]
            },
            modelo:{
                type: String,
                required: [true, "Modelo requerido para crear un objeto"]
            },
            generacion:{
                type: Number,
                required: [true, "Generacion requerido para crear un objeto"],
                min: 1,
                max: 12
            }
        },
        tarjeta_grafica:{
            tipo:{
                type: String
            },
            marca:{
                type: String
            },
            modelo:{
                type: String
            },
        },
        caja:{
            color:{
                type: [String],
                required: [true, "Colores requerido para crear un objeto"]
            },
            dimensiones:{
                h:{
                    type: Number,
                    required: [true, "Altura requerido para crear un objeto"]
                },
                w:{
                    type: Number,
                    required: [true, "Ancho requerido para crear un objeto"]
                },
            },
            usb:{
                type: [Number],
                required: [true, "USB requerido para crear un objeto"]
            },
        },
        fuente:{
            type: String
        },
        disco:[{
            _id: false,
            tipo:{
                type: String
            },
            capacidad:{
                type: Number
            },
        }],
        sistema_operativo:{
            type: Boolean
        },
        fecha_fabricacion:{
            type: Date,
            required: [true, "Fecha requerido para crear un objeto"],
            validate: [fechaMinima, "La fecha debe ser mayor a 2015"]
        }
    },
    perifericos:{
        type: [String]
    },
    precio: {
        type: Number,
        min: 100,
        required: [true, "Precio requerido para crear un objeto"]
    }
})

function fechaMinima(fecha:Date) {
    return fecha >= new Date('2015-01-01');
}

export const Ordenador = model('ordenadores', ordenadorSchema)  