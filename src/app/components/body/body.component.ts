import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  productos = [
    {
      nombre: 'Gabinete',
      descripcion: 'Gabinete de PC moderno con diseño gaming y buena ventilación.',
      imagen: 'gabinete.png'
    },
    {
      nombre: 'Memoria DDR4 8GB',
      descripcion: 'Memoria RAM DDR4 de 8GB a 2666MHz, ideal para multitarea.',
      imagen: 'memoria-generico-dimm-ddr4-8gb-2666mhz-cl19-25158.png'
    },
    {
      nombre: 'Placa Base',
      descripcion: 'Placa madre compatible con procesadores Intel/AMD.',
      imagen: 'placa-base.png'
    }
  ];
  
}  
