import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {
  user = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  registrar() {
    if (!this.user || !this.email || !this.password || !this.confirmPassword) {
      Swal.fire('Campos incompletos', 'Por favor, completa todos los campos.', 'warning');
      return;
    }

    if (this.password !== this.confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
      return;
    }
    
    // Llama al servicio de registro, que ahora se comunica con el backend de PHP
    this.usuarioService.registrarUsuario({
      user: this.user,
      password: this.password,
      email: this.email
    }).subscribe(
      (response) => {
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario registrado con éxito',
            showConfirmButton: false,
            timer: 2000
          });
          setTimeout(() => {
            this.router.navigate(['/iniciar-sesion']);
          }, 2000);
        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
      (error) => {
        console.error('Error al registrarse:', error);
        Swal.fire('Error de conexión', 'No se pudo conectar con el servidor. Por favor, verifica XAMPP.', 'error');
      }
    );
  }
}