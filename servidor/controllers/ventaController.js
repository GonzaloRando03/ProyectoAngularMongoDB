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
exports.ventaController = void 0;
const ventaSchema_1 = require("../schemas/ventaSchema");
class ventaControl {
    constructor() {
        /* crea una nueva venta */
        this.crearVenta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                let docSchema = {
                    idVenta: req.body._idVenta,
                    vendedor: req.body._vendedor,
                    comprador: req.body._comprador,
                    fechaVenta: req.body._fechaVenta
                };
                let venta = new ventaSchema_1.Venta(docSchema);
                yield venta.save();
                res.send(venta);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* obtiene las ventas de la base de datos */
        this.obtenerVenta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ventas = yield ventaSchema_1.Venta.find({}).sort({ idVenta: 1 });
                res.json(ventas);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* actualiza venta de la base de datos */
        this.actualizarVenta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let docSchema = {
                    idVenta: req.body._idVenta,
                    vendedor: req.body._vendedor,
                    comprador: req.body._comprador,
                    fechaVenta: req.body._fechaVenta
                };
                let venta = yield ventaSchema_1.Venta.findOne({ "idVenta": { $eq: req.params.id } });
                if (!venta) {
                    res.status(404).json({ msg: "No exista la venta seleccionada" });
                }
                venta.idVenta = docSchema.idVenta;
                venta.vendedor = docSchema.vendedor;
                venta.comprador = docSchema.comprador;
                venta.fechaVenta = docSchema.fechaVenta;
                venta = yield ventaSchema_1.Venta.findOneAndUpdate({ idVenta: docSchema.idVenta }, venta);
                res.json(venta);
            }
            catch (error) {
                console.log(error);
            }
        });
        /*  obtiene una venta con el id que escribas en el buscador */
        this.obtenerVentaOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let venta = yield ventaSchema_1.Venta.findOne({ "idVenta": { $eq: req.params.id } });
                if (!venta) {
                    res.status(404).json({ msg: "No exista la venta seleccionada" });
                }
                res.json(venta);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* elimina una venta de la base de datos */
        this.eliminarVenta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let venta = yield ventaSchema_1.Venta.findOne({ "idVenta": { $eq: req.params.id } });
                if (!venta) {
                    res.status(404).json({ msg: "No exista la venta seleccionada" });
                }
                yield ventaSchema_1.Venta.findOneAndRemove({ "idVenta": { $eq: req.params.id } });
                res.json({ msg: "Venta eliminada con exito" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.ventaController = new ventaControl();
