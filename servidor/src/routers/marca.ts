import * as express from "express"
import { marcaController } from "../controllers/marcaController"

export const routerMarca = express.Router()

/* routers de las marcas */
routerMarca.get('/', marcaController.getMarca)
routerMarca.get('/:id', marcaController.getMarcaOne)
