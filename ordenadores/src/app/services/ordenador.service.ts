import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordenador } from '../models/ordenador';

@Injectable({
  providedIn: 'root'
})

/* manda las peticiones al backend mediante httpclient */
export class OrdenadorService {

  url = 'http://localhost:4000/api/ordenadores/'
  constructor(private http: HttpClient) { }

  getOrdenadores(): Observable<any> {
    return this.http.get(this.url)
  }

  eliminarOrdenador(id: number): Observable<any> {
    return this.http.delete(this.url + id)
  }

  guardarOrdenador(ordenador: Ordenador): Observable<any> {
    return this.http.post(this.url, ordenador)
  }

  obtenerOrdenador(id : number):  Observable<any> {
    return this.http.get(this.url + id)
  }

  editarOrdenador(id : number, ordenador: Ordenador):  Observable<any> {
    return this.http.put(this.url + id, ordenador)
  }
}
