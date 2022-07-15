import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdenadorService } from 'src/app/services/ordenador.service';

@Component({
  selector: 'app-listar-ordenador',
  templateUrl: './listar-ordenador.component.html',
  styleUrls: ['./listar-ordenador.component.css']
})
export class ListarOrdenadorComponent implements OnInit {
  buscador: FormGroup
  listOrdenador: any = []
  id: any

  constructor(private fb: FormBuilder,
              private _ordenadorService: OrdenadorService,
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
    this.obtenerOrdenadores()
  }

  /* consigue los ordenadores de la base de datos */
  obtenerOrdenadores() {
    this.id = this.aRouter.snapshot.paramMap.get('id')!
    this.id = parseInt(this.id, 10)
    this.listOrdenador = []
    if (isNaN(this.id)) {
      /* funcion de ordenadorService */
      this._ordenadorService.getOrdenadores().subscribe(data => {
        console.log(this.id)
        console.log(data)
        this.listOrdenador = data
      }, error => {
        console.log(error)
      })
    } else{ 
      this.listOrdenador = []
      /* funcion de ordenadorService */
      this._ordenadorService.obtenerOrdenador(this.id).subscribe(data => {
        this.listOrdenador.push(data)
        console.log("es editar")
        console.log(this.listOrdenador)
      })
    }
  }

 /*  funcion para borrar ordenador */
  eliminarOrdenador(id: any){
    this._ordenadorService.eliminarOrdenador(id).subscribe(data => {
      this.toastr.info('El ordenador fue eliminado con exito', 'Ordenador eliminado')
      this.obtenerOrdenadores()
    }, error => {
      console.log(error)
    })
  }


/*   funcion para ver el id */
  verId() {
    this.id = this.buscador.get('id')?.value
    return this.id
  }
}

