import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost/api/api.php';

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<any> {
    const data = { action: 'getProducts' };
    return this.http.post(this.apiUrl, data);
  }
}