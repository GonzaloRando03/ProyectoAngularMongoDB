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
exports.marcaController = void 0;
const marcaSchema_1 = require("../schemas/marcaSchema");
const ordenadorSchema_1 = require("../schemas/ordenadorSchema");
class marcaControl {
    constructor() {
        /* realiza una consulta y crea la coleccion marcas con las marcas usadas en los ordenadores */
        this.getMarca = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield marcaSchema_1.Marca.deleteMany();
                yield ordenadorSchema_1.Ordenador.aggregate([
                    {
                        $project: {
                            name: [
                                "$caracteristicas.placa.marca",
                                "$caracteristicas.procesador.marca",
                                "$caracteristicas.tarjeta_grafica.marca"
                            ],
                            ordenador: "$idOrdenador"
                        }
                    },
                    {
                        $unwind: {
                            path: "$name"
                        }
                    },
                    {
                        $group: {
                            _id: "$name",
                            ordenadores: {
                                $addToSet: "$ordenador"
                            },
                            noProvisiones: {
                                $sum: 1
                            }
                        }
                    },
                    {
                        $match: { "_id": { $ne: null } }
                    },
                    {
                        $match: { "_id": { $ne: "" } }
                    },
                    {
                        $merge: {
                            into: "marcas",
                            on: "_id",
                            whenMatched: "replace",
                            whenNotMatched: "insert"
                        }
                    }
                ]);
                const query = yield marcaSchema_1.Marca.find({});
                res.send(query);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* consigue la marca con el id que mandemos por el buscador */
        this.getMarcaOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield marcaSchema_1.Marca.find({ _id: { $eq: req.params.id } });
                res.send(query);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.marcaController = new marcaControl();
