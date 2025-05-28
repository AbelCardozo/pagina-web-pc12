import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Producto {
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productos: Producto[] = [
    {
      nombre: 'Camiseta Gamer',
      precio: 2999.99,
      imagen: '/img/camiseta.png',
      cantidad: 12
    },
    {
      nombre: 'Taza de Pac-man ',
      precio: 1899.50,
      imagen: '/img/taza.png',
      cantidad: 7
    },
    {
      nombre: 'Llavero anime',
      precio: 999.00,
      imagen: '/img/llavero.png',
      cantidad: 20
    }
  ];

  getProductos(): Producto[] {
    return this.productos;
  }
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos: Producto[] = [];
  filtro: string = '';

  constructor(private productosService: ProductosService) {
    this.productos = this.productosService.getProductos();
  }

  get productosFiltrados(): Producto[] {
    return this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
