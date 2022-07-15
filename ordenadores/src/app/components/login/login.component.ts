import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QueriesService } from 'src/app/services/queries.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup
/*   En el constructor usamos los campos que usaremos exportados de angular y otros módulos */
  constructor(private _queriesService: QueriesService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private aRouter: ActivatedRoute) {
      this.login = this.fb.group({
        usuario: ['', Validators.required],
        password: ['', Validators.required]
      }) 
  }

/*   Aqui ponemos las funciones que queremos que se ejecuten cuando accedamos a la página */
  ngOnInit(): void {
    this.disconect()
  }
  
  logueo() {
    let datos = {
      /* conseguimos los datos de los campos del formulario */
      usuario: this.login.get('usuario')?.value,
      password: this.login.get('password')?.value
    }

 /* mandamos una peticion al  para que mande usuario y contraseña y se conecte a la base de datos */
    this._queriesService.login(datos).subscribe(data => {
        console.log(data)
        if (data == "Error"){
          this.toastr.error('Usuario o contraseña incorrectos', 'Error')
        }else{
          this.toastr.info('Logueado con exito', 'Correcto')
          this.router.navigate(['/menu'])
        }

    })
  }

  /* manda una peticion al backend para desconectarse de la base de datos */
  disconect() {
    this._queriesService.desconectar().subscribe(data => {})
  }
}
