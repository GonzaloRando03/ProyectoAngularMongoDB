import { Marca } from "../schemas/marcaSchema"
import { Ordenador } from "../schemas/ordenadorSchema"


class marcaControl {

    /* realiza una consulta y crea la coleccion marcas con las marcas usadas en los ordenadores */
    getMarca = async (req: any, res: any) => {
        try {
            await Marca.deleteMany()
            await Ordenador.aggregate( [
                {
                    $project: {
                        name: [
                          "$caracteristicas.placa.marca",
                          "$caracteristicas.procesador.marca",
                          "$caracteristicas.tarjeta_grafica.marca"
                        ],
                        ordenador: "$idOrdenador"
                    }
                },
                {
                    $unwind: {
                        path: "$name"
                    }
                },
                {
                    $group: {
                        _id: "$name",
                        ordenadores: {
                            $addToSet: "$ordenador"
                        },
                        noProvisiones: {
                          $sum: 1
                        }
                    }
                },
                {
                  $match : { "_id": { $ne: null } }
                },
                {
                  $match : { "_id": { $ne: "" } }
                },
                {
                  $merge : { 
                    into: "marcas", 
                    on: "_id", 
                    whenMatched: "replace", 
                    whenNotMatched: "insert" 
                  }
                }
                
              ])

              
            const query = await Marca.find({})
            res.send(query)
        }catch (error){
            console.log(error)
        }
    }

    /* consigue la marca con el id que mandemos por el buscador */
    getMarcaOne = async (req: any, res: any) => {
      try {
          const query = await Marca.find({_id: {$eq: req.params.id}})
          res.send(query)
      }catch (error){
          console.log(error)
      }
  }

}

export const marcaController = new marcaControl()