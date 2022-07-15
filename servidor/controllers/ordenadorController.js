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
exports.ordenadorController = void 0;
const ordenadorSchema_1 = require("../schemas/ordenadorSchema");
class ordenadorControl {
    constructor() {
        /* crea un ordenador pasandolo por el schema y guardandolo en la base de datos */
        this.crearOrdenador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                let docSchema = {
                    idVenta: req.body._idVenta,
                    idOrdenador: req.body._idOrdenador,
                    caracteristicas: {
                        placa: {
                            socket: req.body._socket,
                            marca: req.body._marcaPlaca,
                            puertos: req.body._puertos,
                        },
                        memoria: {
                            capacidad: req.body._capacidadMem,
                            tipo: req.body._tipoMem,
                        },
                        procesador: {
                            marca: req.body._marcaProc,
                            modelo: req.body._modeloProc,
                            generacion: req.body._generacion,
                        },
                        tarjeta_grafica: {
                            tipo: req.body._tarjetaGrafica.tipo,
                            marca: req.body._tarjetaGrafica.marca,
                            modelo: req.body._tarjetaGrafica.modelo,
                        },
                        caja: {
                            color: req.body._color,
                            dimensiones: {
                                h: req.body._alto,
                                w: req.body._ancho,
                            },
                            usb: req.body._usb,
                        },
                        fuente: req.body._fuente,
                        disco: req.body._discos,
                        sistema_operativo: req.body._sistemaOperativo,
                        fecha_fabricacion: req.body._fechaFabricacion,
                    },
                    perifericos: req.body._perifericos,
                    precio: req.body._precio
                };
                let ordenador = new ordenadorSchema_1.Ordenador(docSchema);
                yield ordenador.save();
                res.send(ordenador);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* Obtiene un ordenador de la base de datos */
        this.obtenerOrdenador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ordenadores = yield ordenadorSchema_1.Ordenador.find({}).sort({ idOrdenador: 1 });
                res.json(ordenadores);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* Actualiza los datos de un ordenador de la base de datos */
        this.actualizarOrdenador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let docSchema = {
                    idVenta: req.body._idVenta,
                    idOrdenador: req.body._idOrdenador,
                    caracteristicas: {
                        placa: {
                            socket: req.body._socket,
                            marca: req.body._marcaPlaca,
                            puertos: req.body._puertos,
                        },
                        memoria: {
                            capacidad: req.body._capacidadMem,
                            tipo: req.body._tipoMem,
                        },
                        procesador: {
                            marca: req.body._marcaProc,
                            modelo: req.body._modeloProc,
                            generacion: req.body._generacion,
                        },
                        tarjeta_grafica: {
                            tipo: req.body._tarjetaGrafica.tipo,
                            marca: req.body._tarjetaGrafica.marca,
                            modelo: req.body._tarjetaGrafica.modelo,
                        },
                        caja: {
                            color: req.body._color,
                            dimensiones: {
                                h: req.body._alto,
                                w: req.body._ancho,
                            },
                            usb: req.body._usb,
                        },
                        fuente: req.body._fuente,
                        disco: req.body._discos,
                        sistema_operativo: req.body._sistemaOperativo,
                        fecha_fabricacion: req.body._fechaFabricacion,
                    },
                    perifericos: req.body._perifericos,
                    precio: req.body._precio
                };
                let ordenador = yield ordenadorSchema_1.Ordenador.findOne({ "idOrdenador": { $eq: req.params.id } });
                if (!ordenador) {
                    res.status(404).json({ msg: "No exista el ordenador seleccionado" });
                }
                ordenador.idVenta = docSchema.idVenta;
                ordenador.idOrdenador = docSchema.idOrdenador;
                ordenador.caracteristicas = docSchema.caracteristicas;
                ordenador.perifericos = docSchema.perifericos;
                ordenador.precio = docSchema.precio;
                ordenador = yield ordenadorSchema_1.Ordenador.findOneAndUpdate({ idOrdenador: docSchema.idOrdenador }, ordenador);
                res.json(ordenador);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* obtiene un solo ordenador con el id que mandemos por el buscador */
        this.obtenerOrdenadorOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let ordenador = yield ordenadorSchema_1.Ordenador.findOne({ "idOrdenador": { $eq: req.params.id } });
                if (!ordenador) {
                    res.status(404).json({ msg: "No existe el ordenador seleccionado" });
                }
                res.json(ordenador);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* elimina un ordenador de la base de datos */
        this.eliminarOrdenador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let ordenador = yield ordenadorSchema_1.Ordenador.findOne({ "idOrdenador": { $eq: req.params.id } });
                if (!ordenador) {
                    res.status(404).json({ msg: "No existel ordenador seleccionado" });
                }
                yield ordenadorSchema_1.Ordenador.findOneAndRemove({ "idOrdenador": { $eq: req.params.id } });
                res.json({ msg: "Ordenador eliminado con exito" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.ordenadorController = new ordenadorControl();
