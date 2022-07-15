import { Component, OnInit } from '@angular/core';
import { QueriesService } from 'src/app/services/queries.service';

@Component({
  selector: 'app-caro-barat',
  templateUrl: './caro-barat.component.html',
  styleUrls: ['./caro-barat.component.css']
})
export class CaroBaratComponent implements OnInit {

  list: any = []
  constructor(private _queriesService: QueriesService,) { }

  ngOnInit(): void {
    this.caroBarato()
  }

    caroBarato() {
      this._queriesService.getCaroBarato().subscribe(data => {
        console.log(data)
        this.list = data
    })
  }

}
