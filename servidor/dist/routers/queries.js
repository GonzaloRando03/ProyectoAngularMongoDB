"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerDB = exports.routerQuerie = void 0;
const express = __importStar(require("express"));
const database_1 = require("../config/database");
const querieController_1 = require("../controllers/querieController");
exports.routerQuerie = express.Router();
//api querires
exports.routerQuerie.get('/descuento/', querieController_1.querieController.obtenerDescuento);
exports.routerQuerie.get('/comprador/', querieController_1.querieController.obtenerCompradores);
exports.routerQuerie.get('/precioPc/', querieController_1.querieController.obtenerPrecioPc);
exports.routerQuerie.get('/caroBarato/', querieController_1.querieController.obtenerCaroBarato);
exports.routerQuerie.get('/ventas/', querieController_1.querieController.obtenerVenta);
exports.routerQuerie.get('/marcaVentas/', querieController_1.querieController.obtenerMarcaVenta);
exports.routerDB = express.Router();
exports.routerDB.post('/', database_1.db.login);
exports.routerDB.get('/', database_1.db.desconectarBD);
