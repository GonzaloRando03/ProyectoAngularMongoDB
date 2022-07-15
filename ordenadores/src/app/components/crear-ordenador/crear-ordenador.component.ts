import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Disk, Ordenador, Tarjeta } from 'src/app/models/ordenador';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdenadorService } from 'src/app/services/ordenador.service';
import dateFormat, { masks } from "dateformat";
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-crear-ordenador',
  templateUrl: './crear-ordenador.component.html',
  styleUrls: ['./crear-ordenador.component.css']
})
export class CrearOrdenadorComponent implements OnInit {
  ordenadorForm: FormGroup;
  id : any
  titulo = 'Crear nuevo ordenador'
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _ordenadorService: OrdenadorService,
              private aRouter: ActivatedRoute) { 
    /* valores del formulario con sus validaciones */
    this.ordenadorForm = this.fb.group({
      idVenta: ['', Validators.required],
      idOrdenador: ['', Validators.required],
      socket: ['', Validators.required],
      marcaPlaca: ['', Validators.required],
      puertos: ['', Validators.required],
      capacidadMem: [ '' , Validators.required],
      tipoMem: ['', Validators.required],
      marcaProc: ['', Validators.required],
      modeloProc: ['', Validators.required],
      generacion: [ '' , Validators.required],
      tipoGpu: [''],
      marcaGpu: [''],
      modeloGpu: [''],
      color: ['', Validators.required],
      alto: ['', Validators.required],
      ancho: ['', Validators.required],
      usb: [ '' , Validators.required],
      fuente: ['', Validators.required],
      /* creamos un nuevo form array */
      discos: this.fb.array([]),
      sistemaOperativo: [false],
      fechaFabricacion: ['', Validators.required],
      perifericos: [''],
      precio: [ '' , Validators.required]

    })
    /* conseguimos el id del parametro */
    this.id = this.aRouter.snapshot.paramMap.get('id')!
    this.id = parseInt(this.id, 10)
  }

  /* funciones que queremos que se ejecuten cuando abramos el archivo */
  ngOnInit(): void {
    this.addDisco()
    this.esEditar()
  }

  /* conseguimos los discos del formulario */
  get discosFormArray(): FormArray {
    return this.ordenadorForm.get('discos') as FormArray;
  }

  /* funcion de añadir disco para el formulario  */
  addDisco() {
    
    const disco = this.fb.group({
      tipo: new FormControl(''),
      capacidad: new FormControl('')
    });
  
    this.discosFormArray.push(disco);
  }

  /* funcion de borrar disco para el formulario  */
  borrarDisco(i: number) {
    console.log(i)
    if (i !== 0){
      this.discosFormArray.removeAt(i)
    }
  }

  
  agregarOrdenador() {
    /* conseguimos los campos del formulario0 y los guardamos en variables */
    let idVenta = this.ordenadorForm.get('idVenta')?.value
    let idOrdenador = this.ordenadorForm.get('idOrdenador')?.value
    let socket = this.ordenadorForm.get('socket')?.value
    let marcaPlaca= this.ordenadorForm.get('marcaPlaca')?.value
    let puertos
    let capacidadMem = this.ordenadorForm.get('capacidadMem')?.value
    let tipoMem = this.ordenadorForm.get('tipoMem')?.value
    let marcaProc = this.ordenadorForm.get('marcaProc')?.value
    let modeloProc = this.ordenadorForm.get('modeloProc')?.value
    let generacion = this.ordenadorForm.get('generacion')?.value
    let tarjetaGrafica: Tarjeta = {
      tipo: this.ordenadorForm.get('tipoGpu')?.value,
      marca: this.ordenadorForm.get('marcaGpu')?.value,
      modelo: this.ordenadorForm.get('modeloGpu')?.value
    }
    let color
    let alto = this.ordenadorForm.get('alto')?.value
    let ancho = this.ordenadorForm.get('ancho')?.value
    let usbF = this.ordenadorForm.get('usb')?.value
    let usb: any = []
    for (let i in usbF.split(",")){
      usb.push(parseInt(i))
    }
    let fuente = this.ordenadorForm.get('fuente')?.value
    let discos = this.ordenadorForm.get('discos')?.value
    let sistemaOperativo = this.ordenadorForm.get('sistemaOperativo')?.value
    let fechaFabricacion = this.ordenadorForm.get('fechaFabricacion')?.value
    let perifericos
    let precio = this.ordenadorForm.get('precio')?.value
    if (isNaN(this.id)){
      let puertosF = this.ordenadorForm.get('puertos')?.value
      puertos = puertosF.split(',')
      let colorF = this.ordenadorForm.get('color')?.value
      color = colorF.split(",")
      let perifericosF = this.ordenadorForm.get('perifericos')?.value
      perifericos = perifericosF.split(",")
      

    } else {
      puertos = this.ordenadorForm.get('puertos')?.value
      color = this.ordenadorForm.get('color')?.value
      perifericos = this.ordenadorForm.get('perifericos')?.value
      console.log(this.ordenadorForm.get('usb')+ " este es el tipo")
    }

    /* nos creamos un objeto con esos valores */
    const ordenador: Ordenador = new Ordenador(idVenta, idOrdenador, socket, marcaPlaca, puertos, capacidadMem, tipoMem, marcaProc, modeloProc, generacion, tarjetaGrafica, color, alto, ancho, usb, fuente, discos, sistemaOperativo, fechaFabricacion, perifericos, precio)
    console.log(ordenador)

    if (isNaN(this.id)) {
      this._ordenadorService.guardarOrdenador(ordenador).subscribe(data => {
        this.toastr.info('El ordenador fue creado con exito', 'Ordenador registrado')
        this.router.navigate(['/listar-ordenador'])
      }, error => {
        console.log(error)
        this.ordenadorForm.reset()
      })
    //añadir
  } else {
    //editar
    this._ordenadorService.editarOrdenador(this.id, ordenador).subscribe(data => {
      this.toastr.info('El ordenador fue actuializad con exito', 'Ordenador actualizado')
      this.router.navigate(['/listar-ordenador'])
    }, error => {
      console.log(error)
      this.ordenadorForm.reset()
    })
  }
  }

  /* funcion que ve si es editar el ordenador o es crear un ordenador */
  esEditar() {
    console.log(this.id)
    if (this.id !== null) {
      this.titulo = 'Editar ordenador'
      this._ordenadorService.obtenerOrdenador(this.id).subscribe(data => {
        let fecha = dateFormat(data.caracteristicas.fecha_fabricacion, "yyyy-mm-dd");
        console.log(data)
        /* si es editar da los valores del objeto al formulario */
      this.ordenadorForm.patchValue({
        precio: data.precio,
        sistemaOperativo: data.caracteristicas.sistema_operativo,
        fechaFabricacion: fecha,
        perifericos: data.perifericos,
        idVenta: data.idVenta,
        idOrdenador: data.idOrdenador,
        socket: data.caracteristicas.placa.socket,
        marcaPlaca: data.caracteristicas.placa.marca,
        puertos: data.caracteristicas.placa.puertos,
        capacidadMem: data.caracteristicas.memoria.capacidad,
        tipoMem: data.caracteristicas.memoria.tipo,
        marcaProc: data.caracteristicas.procesador.marca,
        modeloProc: data.caracteristicas.procesador.modelo,
        generacion: data.caracteristicas.procesador.generacion,
        tipoGpu: data.caracteristicas.tarjeta_grafica.tipo,
        marcaGpu: data.caracteristicas.tarjeta_grafica.marca,
        modeloGpu: data.caracteristicas.tarjeta_grafica.modelo,
        color: data.caracteristicas.caja.color,
        alto: data.caracteristicas.caja.dimensiones.h,
        ancho: data.caracteristicas.caja.dimensiones.w,
        usb: String(data.caracteristicas.caja.usb),
        fuente: data.caracteristicas.fuente,
        discos: data.caracteristicas.disco,

      })
     })
    }
  }

}
