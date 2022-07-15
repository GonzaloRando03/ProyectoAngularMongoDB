import * as express from "express"
import { ordenadorController } from '../controllers/ordenadorController'


export const routerOrdenador = express.Router()

//api ordenadors
routerOrdenador.post('/', ordenadorController.crearOrdenador)
routerOrdenador.get('/', ordenadorController.obtenerOrdenador)
routerOrdenador.put('/:id', ordenadorController.actualizarOrdenador)
routerOrdenador.get('/:id', ordenadorController.obtenerOrdenadorOne)
routerOrdenador.delete('/:id', ordenadorController.eliminarOrdenador)
