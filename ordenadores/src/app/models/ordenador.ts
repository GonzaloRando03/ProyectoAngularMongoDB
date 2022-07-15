/* Tipos de datos  */
export interface Marca {
  _id: string
  ordenadores?: number[]
  noProvisiones?: number
}

export interface Disk {
  tipo: string
  capacidad: number
}

export interface Tarjeta {
  tipo?: string
  marca?: string
  modelo?: string
}

/* Clase ordenador */
export class Ordenador {
  private _idVenta: number
  private _idOrdenador: number
  private _socket: string
  private _marcaPlaca: string
  private _puertos: string[]
  private _capacidadMem: number
  private _tipoMem: string
  private _marcaProc: string
  private _modeloProc: string
  private _generacion: number
  private _tarjetaGrafica: Tarjeta
  private _color: string[]
  private _alto: number
  private _ancho: number
  private _usb: number[]
  private _fuente: string
  private _discos: Disk[]
  private _sistemaOperativo: boolean
  private _fechaFabricacion: Date
  private _perifericos: string[]
  private _precio: number
  private "_marcas": Marca[]

  constructor(
    idVenta: number,
    idOrdenador: number,
    socket: string,
    marcaPlaca: string,
    puertos: string[],
    capacidadMem: number,
    tipoMem: string,
    marcaProc: string,
    modeloProc: string,
    generacion: number,
    tarjetaGrafica: Tarjeta,
    color: string[],
    alto: number,
    ancho: number,
    usb: number[],
    fuente: string,
    discos: Disk[],
    sistemaOperativo: boolean,
    fechaFabricacion: Date,
    perifericos: string[],
    precio: number
  ) {
    this._idVenta = idVenta
    this._idOrdenador = idOrdenador
    this._socket = socket
    this._marcaPlaca = marcaPlaca
    this._puertos = puertos
    this._capacidadMem = capacidadMem
    this._tipoMem = tipoMem
    this._marcaProc = marcaProc
    this._modeloProc = modeloProc
    this._generacion = generacion
    this._tarjetaGrafica = tarjetaGrafica
    this._color = color
    this._alto = alto
    this._ancho = ancho
    this._usb = usb
    this._fuente = fuente
    this._discos = discos
    this._sistemaOperativo = sistemaOperativo
    this._fechaFabricacion = fechaFabricacion
    this._perifericos = perifericos
    this._precio = precio
  }


  public get idVenta(){
    return this._idVenta 
  }

  get idOrdenador() {
    return this._idOrdenador
  }

  get socket() {
    return this._socket
  }
  
  get marcaPlaca() {
    return this._marcaPlaca
  }

  get puertos() {
    return this._puertos
  }

  get capacidadMem() {
    return this._capacidadMem
  }

  get tipoMem() {
    return this._tipoMem
  }

  get marcaProc() {
    return this._marcaProc
  }

  get modeloProc() {
    return this._modeloProc
  }

  get generacion() {
    return this._generacion
  }

  get tarjetaGrafica() {
    return this._tarjetaGrafica
  }

  get color() {
    return this._color
  }

  get alto() {
    return this._alto
  }

  get ancho() {
    return this._ancho
  }

  get usb() {
    return this._usb
  }

  get fuente() {
    return this._fuente
  }

  get discos() {
    return this._discos
  }

  get sistemaOperativo() {
    return this._sistemaOperativo
  }

  get fechaFabricacion() {
    return this._fechaFabricacion
  }

  get perifericos() {
    return this._perifericos
  }

  get precio() {
    return this._precio
  }

  set marcas(marcas: Marca[]) {
    this._marcas = marcas;
  }

}