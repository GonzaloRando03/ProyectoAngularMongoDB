import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VentaService } from 'src/app/services/venta.service';
import dateFormat, { masks } from "dateformat";

import {Venta} from '../../models/venta'

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})
export class CrearVentaComponent implements OnInit {
  ventaForm: FormGroup
  titulo = 'Crear nueva venta'
  id : any 

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _ventaService: VentaService,
              private aRouter: ActivatedRoute) {
    this.ventaForm = this.fb.group({
      idVenta: ['', Validators.required],
      vendedor: ['', Validators.required],
      comprador: ['', Validators.required],
      fechaVenta: ['']
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')!
    this.id = parseInt(this.id, 10)
   }

  ngOnInit(): void {
    this.esEditar()
  }

  agregarVenta() {
    let idVenta = this.ventaForm.get('idVenta')?.value
    let vendedor = this.ventaForm.get('vendedor')?.value
    let comprador = this.ventaForm.get('comprador')?.value
    let fechaVenta = this.ventaForm.get('fechaVenta')?.value
    const venta: Venta = new Venta(idVenta, vendedor, comprador, fechaVenta)
    console.log(venta)

    if (!isNaN(this.id) ) {
        this._ventaService.editarVenta(this.id, venta).subscribe(data => {
        this.toastr.info('La venta fue actuializada con exito', 'Venta actualizada')
        this.router.navigate(['/listar-venta'])
      }, error => {
        console.log(error)
        this.ventaForm.reset()
      })
      //editar
    } else {
      //añadir
      this._ventaService.guardarVenta(venta).subscribe(data => {
        this.toastr.info('La venta fue creada con exito', 'Venta registrada')
        this.router.navigate(['/listar-venta'])
      }, error => {
        console.log(error)
        this.ventaForm.reset()
      })
    }
  }

  esEditar() {
    if (!isNaN(this.id)) {
      this.titulo = 'Editar venta'
      this._ventaService.obtenerVenta(this.id).subscribe(data => {
        let fecha = dateFormat(data.fechaVenta, "yyyy-mm-dd");
        console.log(fecha)
      this.ventaForm.setValue({
        idVenta: data.idVenta,
        vendedor: data.vendedor,
        comprador: data.comprador,
        fechaVenta: fecha
      })
     })
    }
  }
}
