import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para el tipo de dato de un solo producto
export interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

// Nueva interfaz para la respuesta completa de la API
export interface ProductosApiResponse {
  success: boolean;
  productos: Producto[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  // Ahora apunta a tu Netlify Function
  private apiUrl = '/.netlify/functions/api';

  constructor(private http: HttpClient) { }

  // El método ahora devuelve el objeto de respuesta completo, sin modificarlo.
  // El tipo de retorno es ProductosApiResponse, lo que coincide con lo que tu componente espera.
  obtenerProductos(): Observable<ProductosApiResponse> {
    const data = { action: 'getProducts' };
    return this.http.post<ProductosApiResponse>(this.apiUrl, data);
  }
}