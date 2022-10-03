import * as express from "express"
import { db } from "../config/database"
import { querieController } from "../controllers/querieController"



export const routerQuerie = express.Router()

//api querires
routerQuerie.get('/descuento/', querieController.obtenerDescuento)
routerQuerie.get('/comprador/', querieController.obtenerCompradores)
routerQuerie.get('/precioPc/', querieController.obtenerPrecioPc)
routerQuerie.get('/caroBarato/', querieController.obtenerCaroBarato)
routerQuerie.get('/ventas/', querieController.obtenerVenta)
routerQuerie.get('/marcaVentas/', querieController.obtenerMarcaVenta)



export const routerDB = express.Router()

routerDB.post('/', db.login)
routerDB.get('/', db.desconectarBD)