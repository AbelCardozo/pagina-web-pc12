import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cerrar-sesion',
  standalone: true,
  imports: [],
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Llama al servicio para cerrar la sesión inmediatamente
    this.authService.cerrarSesion();

    // Retrasa la redirección para mostrar el mensaje
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000); // Redirige después de 2 segundos
  }
}
//este modificque