import { Component, OnInit } from '@angular/core';
import { QueriesService } from 'src/app/services/queries.service';

@Component({
  selector: 'app-precio-pc',
  templateUrl: './precio-pc.component.html',
  styleUrls: ['./precio-pc.component.css']
})
export class PrecioPcComponent implements OnInit {
  list: any = []
  constructor(private _queriesService: QueriesService,) { }

  ngOnInit(): void {
    this.precioPc()
  }

    precioPc() {
      this._queriesService.getPrecioPc().subscribe(data => {
        console.log(data)
        this.list = data
    })
  }

}
