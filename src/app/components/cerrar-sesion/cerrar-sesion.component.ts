import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cerrar-sesion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // ✅ 1. Cierra sesión
    this.authService.cerrarSesion();

    // ✅ 2. Espera 2 segundos para mostrar el mensaje antes de redirigir
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
