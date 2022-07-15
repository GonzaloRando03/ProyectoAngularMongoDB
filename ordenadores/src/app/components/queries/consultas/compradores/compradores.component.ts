import { Component, OnInit } from '@angular/core';
import { QueriesService } from 'src/app/services/queries.service';

@Component({
  selector: 'app-compradores',
  templateUrl: './compradores.component.html',
  styleUrls: ['./compradores.component.css']
})
export class CompradoresComponent implements OnInit {
  list: any = []
  constructor(private _queriesService: QueriesService,) { }

  ngOnInit(): void {
    this.compradores()
  }

    compradores() {
      this._queriesService.getCompradores().subscribe(data => {
        console.log(data)
        this.list = data
    })
  }

}
