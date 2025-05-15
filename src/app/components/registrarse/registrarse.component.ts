import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  password = '';
  email = '';
  error = '';
  exito = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  registrar() {
       const nuevoUsuario = {
      user: this.user,
      password: this.password,
      email: this.email
    };

    const registrado = this.usuarioService.registrarUsuario(nuevoUsuario);

    if (registrado) {
      this.exito = 'Usuario registrado con éxito';
      this.router.navigate(['/iniciar-sesion']);
    } else {
      this.error = 'El usuario ya existe';
    }
  }
}