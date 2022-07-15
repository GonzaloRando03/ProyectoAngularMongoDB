import { Component, OnInit } from '@angular/core';
import { QueriesService } from 'src/app/services/queries.service';

@Component({
  selector: 'app-marca-venta',
  templateUrl: './marca-venta.component.html',
  styleUrls: ['./marca-venta.component.css']
})
export class MarcaVentaComponent implements OnInit {
  list: any = []
  constructor(private _queriesService: QueriesService,) { }

  ngOnInit(): void {
    this.marcaVenta()
  }

    marcaVenta() {
      this._queriesService.getMarcaVenta().subscribe(data => {
        console.log(data)
        this.list = data
    })
  }

}
