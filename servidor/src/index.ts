import { db } from './config/database'
import express from "express"
import { routerVenta } from './routers/venta'
import { routerOrdenador } from './routers/ordenador'
import cors from 'cors'
import { routerDB, routerQuerie } from './routers/queries'
import { routerMarca } from './routers/marca'

//creamos el servidor
const app: any = express()

//conectamos con la db
db.conectarBD()
      .then( async (mensaje) => {
        console.log(mensaje)  
      })
      .catch( (error) => {
        console.log(`En conectarDB: ${error}`)
      })


      
//apis
app.use(cors())

app.use(express.json())

app.use('/api/ventas', routerVenta)
app.use('/api/marcas', routerMarca)
app.use('/api/ordenadores', routerOrdenador)
app.use('/api/queries', routerQuerie)
app.use('/api/db', routerDB)

/* puerto que estamos usando */
app.listen(4000, () => {
    console.log('El servidor está corriendo correctamente.')
})



      