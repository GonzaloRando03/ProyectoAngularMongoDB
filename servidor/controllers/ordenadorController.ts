import { Ordenador } from "../schemas/ordenadorSchema"

class ordenadorControl {

    /* crea un ordenador pasandolo por el schema y guardandolo en la base de datos */
    crearOrdenador = async (req: any, res: any) => {
        try {

            console.log(req.body)
            let docSchema: any = {
                idVenta: req.body._idVenta,
                idOrdenador: req.body._idOrdenador,
                caracteristicas: {
                    placa:{
                        socket: req.body._socket,
                        marca: req.body._marcaPlaca,
                        puertos: req.body._puertos,
                    },
                    memoria:{
                        capacidad: req.body._capacidadMem,
                        tipo: req.body._tipoMem,
                    },
                    procesador:{
                        marca: req.body._marcaProc,
                        modelo: req.body._modeloProc,
                        generacion: req.body._generacion,
                    },
                    tarjeta_grafica:{
                        tipo: req.body._tarjetaGrafica.tipo,
                        marca: req.body._tarjetaGrafica.marca,
                        modelo: req.body._tarjetaGrafica.modelo,
                    },
                    caja:{
                        color: req.body._color,
                        dimensiones: {
                            h: req.body._alto,
                            w: req.body._ancho,
                        },
                        usb: req.body._usb,
                    },
                    fuente: req.body._fuente,
                    disco: req.body._discos,
                    sistema_operativo: req.body._sistemaOperativo,
                    fecha_fabricacion: req.body._fechaFabricacion,
                },
                perifericos: req.body._perifericos,
                precio: req.body._precio
            }
            let ordenador = new Ordenador(docSchema)
            await ordenador.save()
            res.send(ordenador)
        }catch (error){
            console.log(error)
        }
    }

    /* Obtiene un ordenador de la base de datos */
    obtenerOrdenador = async (req: any, res: any) => {
        try {
            const ordenadores = await Ordenador.find({}).sort({idOrdenador:1})
            res.json(ordenadores)
        }catch (error){
            console.log(error)
        }
    }

    /* Actualiza los datos de un ordenador de la base de datos */
    actualizarOrdenador = async (req: any, res: any) => {
        try {
            let docSchema: any = {
                idVenta: req.body._idVenta,
                idOrdenador: req.body._idOrdenador,
                caracteristicas: {
                    placa:{
                        socket: req.body._socket,
                        marca: req.body._marcaPlaca,
                        puertos: req.body._puertos,
                    },
                    memoria:{
                        capacidad: req.body._capacidadMem,
                        tipo: req.body._tipoMem,
                    },
                    procesador:{
                        marca: req.body._marcaProc,
                        modelo: req.body._modeloProc,
                        generacion: req.body._generacion,
                    },
                    tarjeta_grafica:{
                        tipo: req.body._tarjetaGrafica.tipo,
                        marca: req.body._tarjetaGrafica.marca,
                        modelo: req.body._tarjetaGrafica.modelo,
                    },
                    caja:{
                        color: req.body._color,
                        dimensiones: {
                            h: req.body._alto,
                            w: req.body._ancho,
                        },
                        usb: req.body._usb,
                    },
                    fuente: req.body._fuente,
                    disco: req.body._discos,
                    sistema_operativo: req.body._sistemaOperativo,
                    fecha_fabricacion: req.body._fechaFabricacion,
                },
                perifericos: req.body._perifericos,
                precio: req.body._precio
            }
            let ordenador: any = await Ordenador.findOne({"idOrdenador" : { $eq: req.params.id }})
            
            if (!ordenador){
                res.status(404).json({msg: "No exista el ordenador seleccionado"})
            }

            ordenador.idVenta = docSchema.idVenta
            ordenador.idOrdenador = docSchema.idOrdenador
            ordenador.caracteristicas = docSchema.caracteristicas
            ordenador.perifericos = docSchema.perifericos
            ordenador.precio = docSchema.precio

            ordenador = await Ordenador.findOneAndUpdate({ idOrdenador: docSchema.idOrdenador}, ordenador)
            res.json(ordenador)
        }catch (error){
            console.log(error)
        }
    }

    /* obtiene un solo ordenador con el id que mandemos por el buscador */
    obtenerOrdenadorOne = async (req: any, res: any) => {
        try {
            let ordenador: any = await Ordenador.findOne({"idOrdenador" : { $eq: req.params.id }})
            
            if (!ordenador){
                res.status(404).json({msg: "No existe el ordenador seleccionado"})
            }

            res.json(ordenador)
        }catch (error){
            console.log(error)
        }
    }

    /* elimina un ordenador de la base de datos */
    eliminarOrdenador = async (req: any, res: any) => {
        try {
            let ordenador: any = await Ordenador.findOne({"idOrdenador" : { $eq: req.params.id }})
            
            if (!ordenador){
                res.status(404).json({msg: "No existel ordenador seleccionado"})
            }

            await Ordenador.findOneAndRemove({"idOrdenador" : { $eq: req.params.id }})
            res.json({msg: "Ordenador eliminado con exito"})
        }catch (error){
            console.log(error)
        }
    }
}

export const ordenadorController = new ordenadorControl()