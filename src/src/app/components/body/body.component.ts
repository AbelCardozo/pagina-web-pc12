import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService, Producto } from '../services/productos.service';
import { RouterLink } from '@angular/router'; // Se añade RouterLink para los enlaces

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterLink], // Se añade RouterLink
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe(response => {
      if (response.success) {
        this.productos = response.productos;
      }
    });
  }
}
