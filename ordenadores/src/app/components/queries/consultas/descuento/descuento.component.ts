import { Component, OnInit } from '@angular/core';
import { QueriesService } from 'src/app/services/queries.service';

@Component({
  selector: 'app-descuento',
  templateUrl: './descuento.component.html',
  styleUrls: ['./descuento.component.css']
})
export class DescuentoComponent implements OnInit {
  list: any = []
  constructor(private _queriesService: QueriesService,) { }

  ngOnInit(): void {
    this.descuento()
  }

    descuento() {
      this._queriesService.getDescuento().subscribe(data => {
        console.log(data)
        this.list = data
    })
  }
}
