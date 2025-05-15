import { Injectable } from '@angular/core';

export interface Usuario {
  user: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [];

  constructor() {
    const usuariosGuardados = localStorage.getItem('usuariosDB');
    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
    } else {
      // ✅ Usuario por defecto con email
      this.usuarios = [
        { user: 'admin', password: '1234', email: 'admin24@gmail.com' }
      ];
      this.guardarUsuarios();
    }
  }

  private guardarUsuarios() {
    localStorage.setItem('usuariosDB', JSON.stringify(this.usuarios));
  }

  obtenerUsuarios(): Usuario[] {
    return this.usuarios;
  }

  registrarUsuario(nuevo: Usuario): boolean {
    const existe = this.usuarios.some(u => u.user === nuevo.user);
    if (existe) return false;
    this.usuarios.push(nuevo);
    this.guardarUsuarios();
    return true;
  }

  validarUsuario(user: string, password: string): boolean {
    return this.usuarios.some(u => u.user === user && u.password === password);
  }

  obtenerUsuarioPorNombre(user: string): Usuario | undefined {
    return this.usuarios.find(u => u.user === user);
  }
}
