import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-listar-venta',
  templateUrl: './listar-venta.component.html',
  styleUrls: ['./listar-venta.component.css']
})
export class ListarVentaComponent implements OnInit {
  buscador: FormGroup
  listVentas: Venta[] = []
  id: any

  constructor(private fb: FormBuilder,
              private _ventaService: VentaService,
              private toastr: ToastrService,
              private router: Router,
              private aRouter: ActivatedRoute) {
      this.buscador = this.fb.group({
        id: ['']
      }) 
      this.id = this.aRouter.snapshot.paramMap.get('id')!
      this.id = parseInt(this.id, 10)
              }

  ngOnInit(): void {
    this.obtenerVentas()
  }

  obtenerVentas() {
    this.id = this.aRouter.snapshot.paramMap.get('id')!
    this.id = parseInt(this.id, 10)
    this.listVentas = []
    if (isNaN(this.id)) {
      this._ventaService.getVenta().subscribe(data => {
        console.log(this.id)
        console.log(data)
        this.listVentas = data
      }, error => {
        console.log(error)
      })
    } else{ 
      this._ventaService.obtenerVenta(this.id).subscribe(data => {
        this.listVentas.push(data)
      })
    }
  }

  eliminarVenta(id: any){
    this._ventaService.eliminarVenta(id).subscribe(data => {
      this.toastr.info('La venta fue eliminado con exito', 'Venta eliminada')
      this.obtenerVentas()
    }, error => {
      console.log(error)
    })
  }

  verId() {
    this.id = this.buscador.get('id')?.value
    return this.id
  }
}




