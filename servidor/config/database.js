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
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DataBase {
    constructor() {
        this._cadenaConexion = 'mongodb+srv://' + 'usuario' + ':' + 'password' + '@cluster0.og9lw.mongodb.net/angular?retryWrites=true&w=majority';
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let usuario = req.body.usuario;
            let password = req.body.password;
            try {
                yield mongoose_1.default.connect('mongodb+srv://' + usuario + ':' + password + '@cluster0.og9lw.mongodb.net/angular?retryWrites=true&w=majority', {});
                console.log('Conectado con exito');
                res.json('Correcto');
            }
            catch (error) {
                res.json("Error");
            }
        });
        this.conectarBD = () => __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield mongoose_1.default.connect(this._cadenaConexion, {})
                    .then(() => {
                    resolve(`Conectado a ${this._cadenaConexion}`);
                })
                    .catch((error) => {
                    reject(`Error conectando a ${this._cadenaConexion}: ${error}`);
                });
            }));
            return promise;
        });
        this.desconectarBD = () => __awaiter(this, void 0, void 0, function* () {
            console.log('Desconectado de la base de datos');
            const promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield mongoose_1.default.disconnect()
                    .then(() => resolve(`Desconectado de ${this._cadenaConexion}`))
                    .catch((error) => reject(`Error desconectando de ${this._cadenaConexion}: ${error}`));
            }));
            return promise;
        });
    }
    set cadenaConexion(_cadenaConexion) {
        this._cadenaConexion = _cadenaConexion;
    }
}
exports.db = new DataBase();
