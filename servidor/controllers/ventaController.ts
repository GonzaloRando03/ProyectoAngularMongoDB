import { Venta } from "../schemas/ventaSchema"

class ventaControl {

    /* crea una nueva venta */
    crearVenta = async (req: any, res: any) => {
        try {
            console.log(req.body)
            let docSchema: any = {
                idVenta: req.body._idVenta,
                vendedor: req.body._vendedor,
                comprador: req.body._comprador,
                fechaVenta: req.body._fechaVenta
            }
            let venta = new Venta(docSchema)
            await venta.save()
            res.send(venta)
        }catch (error){
            console.log(error)
        }
    }

    /* obtiene las ventas de la base de datos */
    obtenerVenta = async (req: any, res: any) => {
        try {
            const ventas = await Venta.find({}).sort({idVenta:1})
            res.json(ventas)
        }catch (error){
            console.log(error)
        }
    }

    /* actualiza venta de la base de datos */
    actualizarVenta = async (req: any, res: any) => {
        try {
            let docSchema: any = {
                idVenta: req.body._idVenta,
                vendedor: req.body._vendedor,
                comprador: req.body._comprador,
                fechaVenta: req.body._fechaVenta
            }
            let venta: any = await Venta.findOne({"idVenta" : { $eq: req.params.id }})
            
            if (!venta){
                res.status(404).json({msg: "No exista la venta seleccionada"})
            }

            venta.idVenta = docSchema.idVenta
            venta.vendedor = docSchema.vendedor
            venta.comprador = docSchema.comprador
            venta.fechaVenta = docSchema.fechaVenta

            venta = await Venta.findOneAndUpdate({ idVenta: docSchema.idVenta}, venta)
            res.json(venta)
        }catch (error){
            console.log(error)
        }
    }

   /*  obtiene una venta con el id que escribas en el buscador */
    obtenerVentaOne = async (req: any, res: any) => {
        try {
            let venta: any = await Venta.findOne({"idVenta" : { $eq: req.params.id }})
            
            if (!venta){
                res.status(404).json({msg: "No exista la venta seleccionada"})
            }

            res.json(venta)
        }catch (error){
            console.log(error)
        }
    }

    /* elimina una venta de la base de datos */
    eliminarVenta = async (req: any, res: any) => {
        try {
            let venta: any = await Venta.findOne({"idVenta" : { $eq: req.params.id }})
            
            if (!venta){
                res.status(404).json({msg: "No exista la venta seleccionada"})
            }

            await Venta.findOneAndRemove({"idVenta" : { $eq: req.params.id }})
            res.json({msg: "Venta eliminada con exito"})
        }catch (error){
            console.log(error)
        }
    }
}

export const ventaController = new ventaControl()