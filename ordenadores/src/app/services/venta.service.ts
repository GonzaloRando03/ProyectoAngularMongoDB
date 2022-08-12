import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  url = 'http://localhost:4000/api/ventas/'
  constructor(private http: HttpClient) { }

  /* manda las peticiones al backend mediante httpclient */
  getVenta(): Observable<any> {
    return this.http.get(this.url)
  }

  eliminarVenta(id: number): Observable<any> {
    return this.http.delete(this.url + id)
  }

  guardarVenta(venta : Venta): Observable<any> {
    return this.http.post(this.url, venta)
  }

  obtenerVenta(id : number):  Observable<any> {
    return this.http.get(this.url + id)
  }

  editarVenta(id : number, venta: Venta):  Observable<any> {
    return this.http.put(this.url + id, venta)
  }
}
