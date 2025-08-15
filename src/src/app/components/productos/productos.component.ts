import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from '../services/productos.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Añade RouterLink
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  filtro: string = '';

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    // Al iniciar el componente, obtenemos los productos del servicio (que llama a la API)
    this.productosService.obtenerProductos().subscribe(response => {
      if (response.success) {
        this.productos = response.productos;
      }
    });
  }

  get productosFiltrados(): Producto[] {
    return this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}