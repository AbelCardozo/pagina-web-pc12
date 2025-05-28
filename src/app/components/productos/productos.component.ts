import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Producto {
   nombre: string;
  descripcion: string;
  precio?: number;     // Opcional para los nuevos productos sin precio
  imagen: string;
  cantidad?: number;   // Opcional también
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productos: Producto[] = [
    {
      nombre: 'Camiseta Gamer',
      descripcion: 'Camiseta temática gamer con diseño exclusivo.',
      precio: 2999.99,
      imagen: '/img/camiseta.png',
      cantidad: 12
    },
    {
      nombre: 'Taza de Pac-man',
      descripcion: 'Taza personalizada con diseño retro de Pac-man.',
      precio: 1899.50,
      imagen: '/img/taza.png',
      cantidad: 7
    },
    {
      nombre: 'Llavero anime',
      descripcion: 'Llavero LED con personajes de anime populares.',
      precio: 999.00,
      imagen: '/img/llavero.png',
      cantidad: 20
    },
    {
      nombre: 'Gabinete',
      descripcion: 'Gabinete de PC moderno con diseño gaming y buena ventilación.',
      precio: 13500.00,
      imagen: '/img/gabinete.png',
      cantidad: 5
    },
    {
      nombre: 'Memoria DDR4 8GB',
      descripcion: 'Memoria RAM DDR4 de 8GB a 2666MHz, ideal para multitarea.',
      precio: 9500.00,
      imagen: '/img/memoria-generico-dimm-ddr4-8gb-2666mhz-cl19-25158.png',
      cantidad: 15
    },
    {
      nombre: 'Placa Base',
      descripcion: 'Placa madre compatible con procesadores Intel.',
      precio: 23000.00,
      imagen: '/img/placa-base.png',
      cantidad: 8
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


 