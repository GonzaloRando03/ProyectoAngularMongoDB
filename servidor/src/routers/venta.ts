import * as express from "express"
import { ventaController } from '../controllers/ventaController'


export const routerVenta = express.Router()

//api ventas
routerVenta.post('/', ventaController.crearVenta)
routerVenta.get('/', ventaController.obtenerVenta)
routerVenta.put('/:id', ventaController.actualizarVenta)
routerVenta.get('/:id', ventaController.obtenerVentaOne)
routerVenta.delete('/:id', ventaController.eliminarVenta)
