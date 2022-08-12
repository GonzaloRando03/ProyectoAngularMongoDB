import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {
/* manda las peticiones al backend mediante httpclient */

  url = 'http://localhost:4000/api/queries/'
  constructor(private http: HttpClient) { }

  getDescuento(): Observable<any> {
    return this.http.get(this.url + 'descuento/')
  }

  getCompradores(): Observable<any> {
    return this.http.get(this.url + 'comprador/')
  }

  getPrecioPc(): Observable<any> {
    return this.http.get(this.url + 'precioPc/')
  }

  getCaroBarato(): Observable<any> {
    return this.http.get(this.url + 'caroBarato/')
  }

  getVentasArticulos(): Observable<any> {
    return this.http.get(this.url + 'ventas/')
  }

  getMarcaVenta(): Observable<any> {
    return this.http.get(this.url + 'marcaVentas/')
  }

  getMarcas(): Observable<any> {
    return this.http.get('http://localhost:4000/api/marcas/')
  }

  getMarca(id: string): Observable<any> {
    return this.http.get('http://localhost:4000/api/marcas/' + id)
  }
  
  login(datos: any): Observable<any> {
    return this.http.post('http://localhost:4000/api/db/', datos)
  }

  desconectar(): Observable<any> {
    return this.http.get('http://localhost:4000/api/db/')
  }
}
