import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  // Ahora apunta a tu Netlify Function
  private apiUrl = '/.netlify/functions/api';

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    const data = { action: 'getProducts' };
    return this.http.post<any>(this.apiUrl, data).pipe(
      map(response => response.productos)
    );
  }
}