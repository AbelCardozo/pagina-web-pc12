import { Component } from '@angular/core';
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
export class CerrarSesionComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.cerrarSesion();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/']);
  }
}
