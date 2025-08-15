import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule,RouterLink, FormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  user = '';
  password = '';

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion() {
    this.usuarioService.validarUsuario(this.user, this.password).subscribe(
      (response) => {
        if (response.success) {
          this.authService.iniciarSesion(this.user);

          Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: 'Inicio de sesión exitoso',
            timer: 2000,
            showConfirmButton: false
          });

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message
          });
        }
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor. Por favor, verifica XAMPP.'
        });
      }
    );
  }
}