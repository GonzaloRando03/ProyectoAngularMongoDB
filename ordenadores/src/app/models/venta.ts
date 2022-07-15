import { Ordenador } from "./ordenador"

export class Venta {
  private _idVenta: number
  private _vendedor: string
  private _comprador: string
  private _fechaVenta: Date
  private "_ordenadores": Array<Ordenador> = new Array<Ordenador>()

  constructor(
    idVenta: number,
    vendedor: string,
    comprador: string,
    fechaVenta: Date
  ) {
    this._idVenta = idVenta
    this._vendedor = vendedor
    this._comprador = comprador
    this._fechaVenta = fechaVenta
  }


  public get idVenta(){
    return this._idVenta 
  }

  get vendedor() {
    return this._vendedor
  }

  get comprador() {
    return this._comprador
  }

  get fechaVenta() {
    return this._fechaVenta
  }

  set ordenadores(ordenadores: Ordenador[]) {
    this._ordenadores = ordenadores;
  }

  get precioVenta() {
    let res = 0;
    for (let o of this._ordenadores) {
      res = res + o.precio
    }
    return res;
  }

  get marcas() {
    let res: string[] = [];
    for (let o of this._ordenadores) {
      for (let m of o.marcas) {
        res.push(m._id)
      }
    }
    return res;
  }
  
}