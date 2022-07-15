import { Component, OnInit } from '@angular/core';
import { Ordenador } from 'src/app/models/ordenador';
import { Venta } from 'src/app/models/venta';
import { QueriesService } from 'src/app/services/queries.service';

@Component({
  selector: 'app-ventas-articulos',
  templateUrl: './ventas-articulos.component.html',
  styleUrls: ['./ventas-articulos.component.css']
})
export class VentasArticulosComponent implements OnInit {
  ventasArticulos:any = []
  constructor(private _queriesService: QueriesService) { }

  ngOnInit(): void {
    this.ventaArticulo()
  }
  
  ventaArticulo() {
    this._queriesService.getVentasArticulos().subscribe(data => {
          let ventasArray: Venta[] =[]
          for (let v of data) {
            let arrayOrdenadores = new Array<Ordenador>()
            let venta: Venta = new Venta(v._id, v.vendedor, v.comprador, v.fechaVenta)
            for (let o of v.ordenadores) {
              arrayOrdenadores.push(o)
            }
            venta.ordenadores = arrayOrdenadores
            ventasArray.push(venta)
          }
          this.ventasArticulos = ventasArray
          console.log(ventasArray)
  
    })
  }
}
