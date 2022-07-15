import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QueriesService } from 'src/app/services/queries.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  buscador: FormGroup
  list: any = []
  id: any;
  constructor(private _queriesService: QueriesService,
              private fb: FormBuilder,
              private aRouter: ActivatedRoute,) {
    this.buscador = this.fb.group({
      id: ['']
    }) 
    this.id = this.aRouter.snapshot.paramMap.get('id')!
  }

  ngOnInit(): void {
    this.obtenerMarcas()
  }

    obtenerMarcas() {
      this.list = []
      console.log(this.id)
      if (this.id == null){
        this._queriesService.getMarcas().subscribe(data => {
          console.log(data)
          this.list = data
        })
      }else {
        this._queriesService.getMarca(this.id).subscribe(data => {
          console.log(data)
          this.list = data
        })
      }
  }
  
  verId() {
    this.id = this.buscador.get('id')?.value
    return this.id
  }

}
