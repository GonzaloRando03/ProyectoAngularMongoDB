"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.querieController = void 0;
const ordenadorSchema_1 = require("../schemas/ordenadorSchema");
const ventaSchema_1 = require("../schemas/ventaSchema");
class querieControl {
    constructor() {
        /* obtiene las ventas con los ordenadores y sus marcas */
        this.obtenerVenta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield ventaSchema_1.Venta.aggregate([
                    {
                        $lookup: {
                            from: 'ordenadores',
                            localField: 'idVenta',
                            foreignField: 'idVenta',
                            as: 'equipo'
                        }
                    },
                    {
                        $unwind: {
                            path: "$equipo"
                        }
                    },
                    {
                        $lookup: {
                            from: 'marcas',
                            localField: 'equipo.idOrdenador',
                            foreignField: 'ordenadores',
                            as: 'equipo.marcas'
                        }
                    },
                    {
                        $project: {
                            idVenta: 1,
                            vendedor: 1,
                            comprador: 1,
                            fechaVenta: 1,
                            equipo: {
                                idVenta: 1,
                                idOrdenador: 1,
                                socket: "$equipo.caracteristicas.placa.socket",
                                marcaPlaca: "$equipo.caracteristicas.placa.marca",
                                puertos: "$equipo.caracteristicas.placa.puertos",
                                capacidadMem: "$equipo.caracteristicas.memoria.capacidad",
                                tipoMem: "$equipo.caracteristicas.memoria.tipo",
                                marcaProc: "$equipo.caracteristicas.procesador.marca",
                                modeloProc: "$equipo.caracteristicas.procesador.modelo",
                                generacion: "$equipo.caracteristicas.procesador.generacion",
                                tarjetaGrafica: "$equipo.caracteristicas.tarjeta_grafica",
                                color: "$equipo.caracteristicas.caja.color",
                                alto: "$equipo.caracteristicas.caja.dimensiones.h",
                                ancho: "$equipo.caracteristicas.caja.dimensiones.w",
                                usb: "$equipo.caracteristicas.caja.usb",
                                fuente: "$equipo.caracteristicas.fuente",
                                discos: "$equipo.caracteristicas.disco",
                                sistemaOperativo: "$equipo.caracteristicas.sistema_operativo",
                                fechaFabricacion: "$equipo.caracteristicas.fecha_fabricacion",
                                perifericos: "$equipo.perifericos",
                                precio: "$equipo.precio",
                                marcas: 1
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$idVenta",
                            comprador: { $first: "$comprador" },
                            vendedor: { $first: "$vendedor" },
                            fechaVenta: { $first: "$fechaVenta" },
                            ordenadores: {
                                $addToSet: "$equipo"
                            }
                        }
                    },
                    {
                        $sort: {
                            _id: -1
                        }
                    }
                ]);
                console.log(query);
                res.json(query);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* obtiene un descuento que aplica informatica sur */
        this.obtenerDescuento = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield ventaSchema_1.Venta.aggregate([
                    {
                        $lookup: {
                            from: 'ordenadores',
                            localField: 'idVenta',
                            foreignField: 'idVenta',
                            as: 'equipo'
                        }
                    },
                    {
                        $unwind: {
                            path: "$equipo"
                        }
                    },
                    {
                        $match: {
                            "vendedor": "Informatica Sur"
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            precio: "$equipo.precio",
                            idOrdenador: "$equipo.idOrdenador",
                            precioDescuento: {
                                $let: {
                                    vars: {
                                        descuento: {
                                            $cond: {
                                                if: {
                                                    $gt: [
                                                        "$equipo.precio",
                                                        1500
                                                    ]
                                                },
                                                then: 0.85,
                                                else: 1
                                            }
                                        }
                                    },
                                    in: {
                                        $multiply: [
                                            "$equipo.precio",
                                            "$$descuento"
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    {
                        $addFields: {
                            applyDiscount: {
                                $cond: {
                                    if: {
                                        $gte: [
                                            "$precio",
                                            1500
                                        ]
                                    },
                                    then: "Aplicado",
                                    else: "No aplicado"
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            idOrdenador: 1,
                            applyDiscount: 1,
                            price: "$precioDescuento"
                        }
                    },
                    {
                        $sort: {
                            price: -1
                        }
                    }
                ]);
                res.json(query);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* obtiene los compradores con el dinero que han generado */
        this.obtenerCompradores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield ventaSchema_1.Venta.aggregate([
                    {
                        $lookup: {
                            from: 'ordenadores',
                            localField: 'idVenta',
                            foreignField: 'idVenta',
                            as: 'productos'
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            comprador: 1,
                            precioCompras: "$productos.precio",
                        }
                    },
                    {
                        $unwind: {
                            path: "$precioCompras"
                        }
                    },
                    {
                        $group: {
                            _id: "$comprador",
                            precioCompras: {
                                $sum: "$precioCompras"
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            precioCompras: {
                                $round: [
                                    "$precioCompras",
                                    0
                                ]
                            },
                        }
                    },
                    {
                        $sort: {
                            precioCompras: -1
                        }
                    }
                ]);
                res.json(query);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* obtiene el precio de los componentes de los ordenadores */
        this.obtenerPrecioPc = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield ordenadorSchema_1.Ordenador.aggregate([
                    {
                        $project: {
                            _id: 0,
                            idOrdenador: 1,
                            precio: 1,
                            precioSinSistema: {
                                $let: {
                                    vars: {
                                        price: {
                                            $cond: {
                                                if: '$caracteristicas.sistema_operativo',
                                                then: 150,
                                                else: 0
                                            }
                                        }
                                    },
                                    in: {
                                        $subtract: [
                                            "$precio",
                                            "$$price"
                                        ]
                                    }
                                }
                            }
                        }
                    }
                ]);
                res.json(query);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* obtiene el ordenador mas caro y el mas barato de 2021 */
        this.obtenerCaroBarato = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const precio = yield ordenadorSchema_1.Ordenador.aggregate([
                    {
                        $match: {
                            "caracteristicas.fecha_fabricacion": {
                                $gte: new Date("2021-01-01"),
                                $lt: new Date("2022-01-01")
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            ordenadorMasCaro: {
                                $max: "$precio"
                            },
                            ordenadorMasBarato: {
                                $min: "$precio"
                            },
                        }
                    }
                ]);
                const caro = precio[0].ordenadorMasCaro;
                const barato = precio[0].ordenadorMasBarato;
                let ordenadorCaro = yield ordenadorSchema_1.Ordenador.findOne({ precio: { $eq: caro } });
                let ordenadorBarato = yield ordenadorSchema_1.Ordenador.findOne({ precio: { $eq: barato } });
                const ordenadorBaratoTipo = {
                    ordenador: ordenadorBarato,
                    tipo: "Barato"
                };
                const ordenadorCaroTipo = {
                    ordenador: ordenadorCaro,
                    tipo: "Caro"
                };
                const query = [ordenadorCaroTipo, ordenadorBaratoTipo];
                res.json(query);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* muestra las marcas que se usan en cada venta */
        this.obtenerMarcaVenta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield ventaSchema_1.Venta.aggregate([
                    {
                        $lookup: {
                            from: 'ordenadores',
                            localField: 'idVenta',
                            foreignField: 'idVenta',
                            as: 'productos'
                        }
                    },
                    {
                        $lookup: {
                            from: 'marcas',
                            localField: 'productos.idOrdenador',
                            foreignField: 'ordenadores',
                            as: 'marcas'
                        }
                    },
                    {
                        $project: {
                            idVenta: 1,
                            marcas: { _id: 1 }
                        }
                    },
                    {
                        $unwind: {
                            path: "$marcas"
                        }
                    },
                    {
                        $group: {
                            _id: "$idVenta",
                            marcas: {
                                $addToSet: "$marcas._id"
                            }
                        }
                    },
                    {
                        $sort: {
                            _id: 1
                        }
                    }
                ]);
                res.json(query);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.querieController = new querieControl();
