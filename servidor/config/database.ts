import mongoose from 'mongoose';


class DataBase {
    
    private _cadenaConexion: string = 'mongodb+srv://' + 'usuario' + ':' + 'password' + '@cluster0.og9lw.mongodb.net/angular?retryWrites=true&w=majority'
    constructor(){

    }
    set cadenaConexion(_cadenaConexion: string){
        this._cadenaConexion = _cadenaConexion
    }

    login = async (req: any, res: any) => {
        let usuario = req.body.usuario
        let password = req.body.password
        try{
            await mongoose.connect('mongodb+srv://' + usuario + ':' + password + '@cluster0.og9lw.mongodb.net/angular?retryWrites=true&w=majority', {
          })
            console.log('Conectado con exito')
            res.json('Correcto')
        }catch (error){
          res.json("Error")
      }
  }

    conectarBD = async () => {
        const promise = new Promise<string>( async (resolve, reject) => {
            await mongoose.connect(this._cadenaConexion, {
            })
            .then( () => {
              resolve(`Conectado a ${this._cadenaConexion}`)
             } )
            .catch( (error) => {
              reject(`Error conectando a ${this._cadenaConexion}: ${error}`) 
            })     
        })
        return promise
    }

    desconectarBD = async () => {
        console.log('Desconectado de la base de datos')
        const promise = new Promise<string>( async (resolve, reject) => {
            
            await mongoose.disconnect() 
            .then( () => 
              resolve(`Desconectado de ${this._cadenaConexion}`) )
              
            .catch( (error) => 
              reject(`Error desconectando de ${this._cadenaConexion}: ${error}`) )     
        })
        return promise
    }
}

export const db = new DataBase()