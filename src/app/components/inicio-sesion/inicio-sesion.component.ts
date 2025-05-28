import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  user = '';
  password = '';
  error = '';

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion() {
    
      console.log('Usuario ingresado:', this.user);
      console.log('Contraseña ingresada:', this.password);
      console.log('Contraseña hasheada:', this.usuarioService.hashearPassword(this.password));

      if (this.usuarioService.validarUsuario(this.user, this.password)) {
      this.authService.iniciarSesion(this.user);

      // ✅ Mostrar SweetAlert de éxito
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
      // ❌ Mostrar SweetAlert de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos'
      });
    }
  }
}





