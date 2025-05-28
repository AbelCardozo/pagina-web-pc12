import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

    const nuevoUsuario = {
      user: this.user,
      password: this.password,
      email: this.email
    };

    const registrado = this.usuarioService.registrarUsuario(nuevoUsuario);

    if (registrado) {
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado con éxito',
        showConfirmButton: false,
        timer: 2000
      });
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    } else {
      Swal.fire('Error', 'El usuario o el correo ya están registrados.', 'error');
    }
  }
}
