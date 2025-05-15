import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';

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
    if (this.usuarioService.validarUsuario(this.user, this.password)) {
      this.authService.iniciarSesion(this.user);
              this.router.navigate(['/']);
         } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}
