import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject para almacenar el usuario actual o null si no hay sesión
  private usuarioActivoSubject = new BehaviorSubject<string | null>(null);

  // Observable público para que los componentes puedan suscribirse
  usuarioActivo$ = this.usuarioActivoSubject.asObservable();

  constructor() {
    // Inicializa con el valor guardado en localStorage (si existe)
    const user = localStorage.getItem('usuarioActivo');
    this.usuarioActivoSubject.next(user);
  }

  // Llamar al iniciar sesión con el user
  iniciarSesion(user: string) {
    localStorage.setItem('usuarioActivo', user);
    this.usuarioActivoSubject.next(user);
  }

  // Llamar al cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    this.usuarioActivoSubject.next(null);
  }

  // Método para obtener valor actual (sin subscribirse)
  obtenerUsuarioActual(): string | null {
    return this.usuarioActivoSubject.value;
  }
}
