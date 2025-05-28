import { Injectable } from '@angular/core';

export interface Usuario {
  user: string;
  password: string;
  email: string;
  rol: string;
  permisos?: PermisoAsignado[];
}

export interface PermisoAsignado {
  descripcion: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [];
  private listaPermisosBase: string[] = [
    'ver_productos',
    'realizar_compras',
    'editar_perfil'
  ];

  constructor() {
    const usuariosGuardados = localStorage.getItem('usuariosDB');
    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
    } else {
      // Usuario administrador por defecto con contraseña hasheada (Base64 de "1234")
      this.usuarios = [
        {
          user: 'admin',
          password: this.hashearPassword('1234'), // "MTIzNA=="
          email: 'admin24@gmail.com',
          rol: 'Administrador',
          permisos: this.asignarPermisos()
        }
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

  existeUsuario(user: string, email: string): boolean {
    return this.usuarios.some(u => u.user === user || u.email === email);
  }

  hashearPassword(password: string): string {
    return btoa(password); // Base64 encoding (simple pero didáctico)
  }

  registrarUsuario(nuevo: { user: string, password: string, email: string }): boolean {
    if (this.existeUsuario(nuevo.user, nuevo.email)) return false;

    const usuarioConRol: Usuario = {
      ...nuevo,
      password: this.hashearPassword(nuevo.password),
      rol: 'Usuario',
      permisos: this.asignarPermisos()
    };

    this.usuarios.push(usuarioConRol);
    this.guardarUsuarios();
    return true;
  }

  validarUsuario(user: string, password: string): boolean {
    const hashed = this.hashearPassword(password);
    return this.usuarios.some(u => u.user === user && u.password === hashed);
  }

  obtenerUsuarioPorNombre(user: string): Usuario | undefined {
    return this.usuarios.find(u => u.user === user);
  }

  private asignarPermisos(): PermisoAsignado[] {
    return this.listaPermisosBase.map(permiso => ({
      descripcion: permiso,
      activo: false
    }));
  }
}

