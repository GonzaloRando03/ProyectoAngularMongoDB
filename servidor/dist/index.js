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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const express_1 = __importDefault(require("express"));
const venta_1 = require("./routers/venta");
const ordenador_1 = require("./routers/ordenador");
const cors_1 = __importDefault(require("cors"));
const queries_1 = require("./routers/queries");
const marca_1 = require("./routers/marca");
//creamos el servidor
const app = (0, express_1.default)();
//conectamos con la db
database_1.db.conectarBD()
    .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(mensaje);
}))
    .catch((error) => {
    console.log(`En conectarDB: ${error}`);
});
//apis
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/ventas', venta_1.routerVenta);
app.use('/api/marcas', marca_1.routerMarca);
app.use('/api/ordenadores', ordenador_1.routerOrdenador);
app.use('/api/queries', queries_1.routerQuerie);
app.use('/api/db', queries_1.routerDB);
/* puerto que estamos usando */
app.listen(4000, () => {
    console.log('El servidor está corriendo correctamente.');
});
